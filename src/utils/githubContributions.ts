import { githubActivity } from '../data/site';

type CommitCountResult = {
  count: number | null;
  source: 'graphql' | 'events' | 'override' | 'unavailable';
};

let cached: Promise<CommitCountResult> | null = null;

function githubUsername(): string {
  try {
    const path = new URL(githubActivity.profileUrl).pathname.replace(/^\//, '');
    return path || githubActivity.username;
  } catch {
    return githubActivity.username;
  }
}

function sinceDate(): Date {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - githubActivity.windowDays);
  since.setUTCHours(0, 0, 0, 0);
  return since;
}

async function fetchCommitCountGraphql(username: string, from: Date, to: Date): Promise<number | null> {
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Cx330xu-github-io',
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    data?: { user?: { contributionsCollection?: { totalCommitContributions?: number } } };
    errors?: unknown[];
  };

  if (json.errors?.length) return null;

  const count = json.data?.user?.contributionsCollection?.totalCommitContributions;
  return typeof count === 'number' ? count : null;
}

async function fetchCommitCountEvents(username: string, since: Date): Promise<number | null> {
  let total = 0;
  let page = 1;
  let reachedOlderEvents = false;

  while (page <= 10 && !reachedOlderEvents) {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'Cx330xu-github-io',
        },
      },
    );

    if (!res.ok) return null;

    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      payload?: { commits?: unknown[] };
    }>;

    if (!events.length) break;

    for (const event of events) {
      const created = new Date(event.created_at);
      if (created < since) {
        reachedOlderEvents = true;
        continue;
      }
      if (event.type === 'PushEvent' && Array.isArray(event.payload?.commits)) {
        total += event.payload.commits.length;
      }
    }

    page += 1;
  }

  return total;
}

export async function getRecentCommitCount(): Promise<CommitCountResult> {
  if (githubActivity.override === true) {
    return { count: githubActivity.minCommits, source: 'override' };
  }
  if (githubActivity.override === false) {
    return { count: 0, source: 'override' };
  }

  const username = githubUsername();
  const from = sinceDate();
  const to = new Date();

  const graphqlCount = await fetchCommitCountGraphql(username, from, to);
  if (graphqlCount !== null) {
    return { count: graphqlCount, source: 'graphql' };
  }

  const eventsCount = await fetchCommitCountEvents(username, from);
  if (eventsCount !== null) {
    return { count: eventsCount, source: 'events' };
  }

  return { count: null, source: 'unavailable' };
}

export async function shouldShowGithubActivity(): Promise<boolean> {
  if (githubActivity.override === true) return true;
  if (githubActivity.override === false) return false;

  cached ??= getRecentCommitCount();
  const { count } = await cached;
  if (count === null) return false;
  return count >= githubActivity.minCommits;
}
