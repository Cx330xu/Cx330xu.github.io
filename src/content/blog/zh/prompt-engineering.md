---
title: 提示工程技术文档
description: 深入解释提示工程的核心原理，详细探讨思维链、少样本学习、RAG 等关键技术方法
date: 2025-09-17
category: ai
tags:
  - LLM
  - Prompt Engineering
  - RAG
  - Agent
featured: true
draft: false
translationKey: prompt-engineering
originalSource: https://blog.csdn.net/Xu_youyaxianshen
---

> 本文由原 HTML 技术文档转换而来，首发于 [CSDN（Xu_youyaxianshen）](https://blog.csdn.net/Xu_youyaxianshen?type=blog)。

提示工程（Prompt Engineering）是一门专注于设计和优化输入指令（即"提示"）的学科，旨在引导大型语言模型（LLM）等人工智能系统生成更准确、更相关、更符合用户期望的输出。它不仅仅是简单地提出问题，而是涉及一套系统化的方法论，通过精心构建的提示来"解锁"模型的潜在能力，并控制其行为。

## 1\. 基础概念与核心原理

理解提示工程的基础知识和核心工作机制

### 1.1 什么是提示工程 (Prompt Engineering)

提示工程（Prompt Engineering）是一门专注于设计和优化输入指令（即"提示"）的学科，旨在引导大型语言模型（LLM）等人工智能系统生成更准确、更相关、更符合用户期望的输出。它不仅仅是简单地提出问题，而是涉及一套系统化的方法论，通过精心构建的提示来"解锁"模型的潜在能力，并控制其行为。

提示工程师需要深入理解模型的内部工作机制、训练数据的特点以及不同提示结构对输出结果的影响，从而设计出能够高效完成特定任务的指令。这门学科的核心在于，通过改变输入的措辞、结构、上下文和示例，来影响模型的"思考"过程和最终答案，使其从一个通用的文本生成器，转变为一个能够执行复杂推理、代码生成、创意写作等高级任务的强大工具。

### 1.2 基本提示结构

一个结构清晰、组织良好的提示（Prompt）是引导大型语言模型（LLM）产生高质量、高相关性输出的基石。根据 [OpenAI 官方的最佳实践指南](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)，一个高效的提示通常由四个核心部分构成：**指令（Instruction）、上下文（Context）、输入数据（Input Data）和输出指示（Output Indicator）**。

#### 指令 (Instruction)

指令是提示的核心，它直接、明确地告诉模型需要执行的具体任务。一个好的指令应该是具体、无歧义且以动词开头的。

#### 上下文 (Context)

上下文为模型提供了执行任务所需的背景信息和约束条件。它可以帮助模型更好地理解输入数据的含义。

#### 输入数据 (Input Data)

输入数据是模型需要处理的具体内容，它是提示中不可或缺的一部分。清晰地标识出输入数据的开始和结束位置很重要。

#### 输出指示 (Output Indicator)

输出指示部分用于定义模型输出的期望格式和结构，这对于后续的程序化处理至关重要。

### 1.3 模型交互原理

#### 1.3.1 Tokenization 机制

Tokenization（分词）是大型语言模型（LLM）处理文本的第一步，也是理解模型如何"看待"语言的关键。它指的是将一段连续的文本字符串分解成一系列更小的、有意义的单元，这些单元被称为**Token**。

**示例：** 句子 "I love programming." 可能会被分解成 `["I", " love", " program", "ming", "."]` 这样的 Token 序列。

#### 1.3.2 温度 (Temperature) 与 Top-p 采样

在调用大型语言模型 API 时， `temperature` 和 `top_p` 是两个至关重要的参数，它们共同控制着模型生成文本的随机性和创造性。[根据 MoldStud 的指南](https://moldstud.com/articles/p-the-ultimate-guide-to-openai-api-for-prompt-engineers-unlocking-the-power-of-advanced-ai-techniques)，这些参数的正确设置对输出质量有显著影响。

##### Temperature

*   • 较低值 (0.2)：更确定、保守的输出
*   • 较高值 (1.0+)：更具创意和多样性
*   • 适用场景：事实性任务 vs 创意任务

##### Top-p (Nucleus Sampling)

*   • 设置概率阈值 (如 0.9)
*   • 只从累积概率超过阈值的词语中选择
*   • 平衡创造性和连贯性

## 2\. 高级提示工程方法论

掌握高级提示技术，提升模型性能

### 2.1 零样本提示 (Zero-Shot Prompting)

零样本提示（Zero-Shot Prompting）是最基础的提示工程方法，它指的是直接向大型语言模型（LLM）提出任务要求，**不提供任何示例或上下文学习**。模型完全依赖其预训练期间学到的知识和能力来理解任务并生成答案。

#### 代码示例：基础零样本提示

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 定义零样本提示
zero_shot_prompt = "请将以下英文句子翻译成中文：'The future of AI is full of possibilities.'"

try:
    # 调用 OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": zero_shot_prompt}
        ],
        temperature=0.7,
        max_tokens=100
    )

    # 提取并打印模型生成的翻译
    translation = response.choices[0].message.content.strip()
    print(f"翻译结果: {translation}")

except Exception as e:
    print(f"调用 API 时出错: {e}")
```

### 2.2 少样本提示 (Few-Shot Prompting)

少样本提示（Few-Shot Prompting）是一种通过在提示中提供少量输入-输出示例来引导大型语言模型（LLM）执行特定任务的技术。与零样本提示不同，少样本提示通过展示期望的行为模式，帮助模型更好地理解任务要求和输出格式，从而显著提高其在复杂或模糊任务上的表现。

#### 示例选择策略

##### 代表性 (Representativeness)

选择的示例应该能够覆盖任务的主要情况和边界条件

##### 多样性 (Diversity)

示例之间应该具有一定的差异性，避免过于相似

##### 清晰性 (Clarity)

示例本身应该是清晰、无歧义的，关系明确

##### 格式一致性 (Format Consistency)

所有示例的格式和结构都应该保持一致

#### 代码示例：实现少样本学习

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 定义少样本提示
few_shot_prompt = """
Extract keywords from the corresponding texts below.

Text 1: Stripe provides APIs that web developers can use to integrate payment processing into their websites and mobile applications.
Keywords 1: Stripe, payment processing, APIs, web developers, websites, mobile applications

Text 2: OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.
Keywords 2: OpenAI, language models, text processing, API

Text 3: {text_input}
Keywords 3:
"""

# 需要提取关键词的文本
new_text = "LangChain is a framework for developing applications powered by language models. It provides tools to create context-aware and reasoning applications."

# 将输入文本填充到提示模板中
formatted_prompt = few_shot_prompt.format(text_input=new_text)

try:
    # 调用 OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": formatted_prompt}
        ],
        temperature=0.3,  # 使用较低的温度以获得更确定性的结果
        max_tokens=100
    )

    # 提取并打印模型生成的关键词
    keywords = response.choices[0].message.content.strip()
    print(f"Extracted Keywords: {keywords}")

except Exception as e:
    print(f"An error occurred: {e}")
```

### 2.3 思维链 (Chain-of-Thought, CoT)

思维链（Chain-of-Thought, CoT）是一种先进的提示工程技术，其核心原理是通过引导大型语言模型（LLM）**生成一系列中间推理步骤**，来解决复杂的逻辑、数学或常识推理问题。这种方法模拟了人类解决复杂问题时的思维过程。

#### 零样本 CoT vs 少样本 CoT

特性

零样本 CoT

少样本 CoT

实现方式

在问题后添加指令性短语

提供包含详细推理步骤的示例

优点

简单、通用、无需准备示例

更精确、可控，能引导特定推理模式

缺点

推理过程可能不够稳定

需要精心准备高质量的示例

适用场景

通用推理任务、快速测试

复杂逻辑问题、数学问题

#### 代码示例：构建思维链提示

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 定义包含思维链的少样本提示
cot_prompt = """
Solve the following math problems by breaking them down into steps.

Problem: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?
Let's think step by step.
Step 1: Roger starts with 5 tennis balls.
Step 2: He buys 2 cans, and each can has 3 balls, so he buys 2 * 3 = 6 tennis balls.
Step 3: The total number of tennis balls is the sum of what he started with and what he bought: 5 + 6 = 11.
Answer: 11

Problem: A bakery sold 45 cookies in the morning and 38 cookies in the afternoon. How many cookies did they sell in total?
Let's think step by step.
Step 1: The bakery sold 45 cookies in the morning.
Step 2: The bakery sold 38 cookies in the afternoon.
Step 3: The total number of cookies sold is the sum of the morning and afternoon sales: 45 + 38 = 83.
Answer: 83

Problem: {new_problem}
Let's think step by step.
"""

# 需要解决的新问题
new_problem = "A library had 120 books. It received a donation of 50 books and then lent out 30 books. How many books does the library have now?"

# 将新问题填充到提示模板中
formatted_prompt = cot_prompt.format(new_problem=new_problem)

try:
    # 调用 OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": formatted_prompt}
        ],
        temperature=0.2,  # 使用较低的温度以确保推理的准确性
        max_tokens=200
    )

    # 提取并打印模型的完整回答
    full_answer = response.choices[0].message.content.strip()
    print(f"Model's Reasoning and Answer:\n{full_answer}")

except Exception as e:
    print(f"An error occurred: {e}")
```

### 2.4 角色扮演 (Role-Playing)

角色扮演是一种在提示工程中广泛使用的技术，它通过为大型语言模型（LLM）设定一个特定的角色或身份，来引导其生成符合该角色特征和知识背景的输出。[相关研究](https://zhuanlan.zhihu.com/p/668732959)表明，这种方法可以显著提高模型在特定领域任务上的表现。

#### 代码示例：创建专家角色提示

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 定义一个函数，用于向设定为特定角色的模型提问
def ask_expert(question, role="a helpful assistant"):
    """
    向大型语言模型提问，并为其设定一个特定的角色。
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are {role}."},
                {"role": "user", "content": question}
            ],
            temperature=0.5,
            max_tokens=300
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"An error occurred: {e}"

# 用户提出的问题
technical_question = "请解释Python中的GIL（全局解释器锁）是什么，以及它对多线程程序的影响。"

# 调用函数，将模型设定为"专业的AI编程助手"
expert_answer = ask_expert(
    question=technical_question,
    role="a professional AI programming assistant, skilled in explaining complex programming concepts clearly and concisely."
)

print("--- 角色扮演：专业编程助手 ---")
print(f"问题：{technical_question}\n")
print(f"回答：{expert_answer}\n")

# 对比实验：使用默认角色（普通助手）
default_answer = ask_expert(question=technical_question)
print("--- 对比实验：默认助手 ---")
print(f"问题：{technical_question}\n")
print(f"回答：{default_answer}")
```

### 2.5 模板化方法 (Template-Based Approaches)

在构建复杂的提示工程应用时，手动拼接字符串来创建提示不仅繁琐，而且容易出错，难以维护。为了解决这个问题，LangChain 等框架提供了强大的模板化工具，其中最核心的就是 `PromptTemplate`。

#### 代码示例：构建可复用的提示模板

```python
from langchain.prompts import PromptTemplate

# 定义一个包含变量的提示模板
code_explanation_template = """
You are an expert Python programmer. Your task is to explain the following code snippet in a clear and concise manner.

Code Snippet:
```python
{code}
```

Explanation:
"""

# 创建一个 PromptTemplate 对象
prompt_template = PromptTemplate(
    input_variables=["code"],
    template=code_explanation_template
)

# 定义要解释的代码
python_code = """
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
"""

# 使用模板生成最终的提示
formatted_prompt = prompt_template.format(code=python_code)

print("--- 生成的提示 ---")
print(formatted_prompt)

# 在实际应用中，可以将 formatted_prompt 发送给 LLM
# llm_response = llm.invoke(formatted_prompt)
```

## 3\. 上下文工程与知识增强

通过上下文管理和知识增强提升模型性能

### 3.1 上下文管理策略

#### 3.1.1 利用对话历史

在多轮对话系统中，维持对话的连续性是至关重要的。由于大型语言模型（LLM）本身是无状态的，它不会自动记忆之前的交互内容。因此，实现多轮对话的核心技术在于**将历史对话记录作为上下文，在每次新的请求中一并发送给模型**。

[腾讯云知识引擎](https://cloud.tencent.com/document/product/1772/115969)的实现方式明确指出：服务端不记录用户请求的上下文，用户在每次请求时，需要将之前所有对话的历史拼接好之后，再传递到对话API。

#### 3.1.2 动态上下文适应

动态上下文适应是比简单拼接历史对话更高级的上下文管理策略，它要求系统能够根据当前对话的进展、用户的意图变化或外部环境的更新，智能地调整传递给模型的上下文信息。

##### 滑动窗口机制

只保留最近N轮的对话历史

##### 摘要技术

对过长历史进行摘要处理

##### 意图识别

动态判断对话主题并检索相关内容

### 3.2 检索增强生成 (Retrieval-Augmented Generation, RAG)

检索增强生成（Retrieval-Augmented Generation, RAG）是一种先进的自然语言处理技术，旨在通过整合外部知识源来显著提升大型语言模型（LLM）的性能和可靠性。[研究表明](https://okram.co.in/retrieval-augmented-generation-practical-tutorial/)，RAG通过引入动态的信息检索组件，有效解决了模型的知识时效性和幻觉问题。

\`\`\`mermaid
graph TD
                  A\["用户查询"\] --> B\["查询嵌入"\]
                  B --> C\["相似度搜索"\]
                  C --> D\["检索相关文本块"\]
                  D --> E\["构建增强提示"\]
                  E --> F\["LLM生成答案"\]
                  F --> G\["最终回答"\]

                  style A fill:#e3f2fd
                  style G fill:#e8f5e8
                  style F fill:#fff3e0
\`\`\`

#### RAG 工作流程：检索、增强、生成

阶段

核心任务

关键技术/组件

1\. 检索 (Retrieval)

从外部知识库中找到与用户查询最相关的信息片段

*   查询嵌入 (Query Embedding)
*   相似度搜索 (Similarity Search)
*   后处理 (Post-processing)

2\. 增强 (Augmentation)

将检索到的信息与原始查询融合，构建增强提示

*   提示模板 (Prompt Template)
*   构建增强提示 (Building Augmented Prompt)

3\. 生成 (Generation)

将增强后的提示输入LLM，生成最终答案

*   模型推理 (Model Inference)
*   答案输出 (Answer Output)

### 3.3 实现知识融合

#### 3.3.1 将检索结果融入提示

将检索结果融入提示是RAG流程中至关重要的一步，它直接决定了LLM能否有效利用外部知识。这个过程的核心在于设计一个清晰、明确的提示结构。

##### 关键要素

*   • 使用分隔符和明确标签组织内容
*   • "背景知识："或"上下文信息："标签
*   • "问题："或"用户查询："标签
*   • 明确指令告知模型基于提供的信息回答

#### 3.3.2 提示模板设计

[有效的提示模板](https://zhuanlan.zhihu.com/p/673552320)是实现外部知识与LLM有效整合的核心。一个好的模板应该包含以下要素：

##### 角色定义

明确指定LLM的角色和回答基调

##### 上下文引入

使用清晰标签引入检索到的文本块

##### 问题陈述

明确区分用户的原始问题

#### 代码示例：使用 LangChain 实现 RAG

```python
# 安装必要的库
# pip install langchain langchain-openai langchain-chroma beautifulsoup4

import bs4
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain import hub
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 1. 加载文档
loader = WebBaseLoader(
    web_paths=("https://lilianweng.github.io/posts/2023-06-23-agent/",),
    bs_kwargs=dict(
        parse_only=bs4.SoupStrainer(
            class_=("post-content", "post-title", "post-header")
        )
    ),
)
docs = loader.load()

# 2. 分割文档
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)

# 3. 创建向量存储
vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

# 4. 定义检索器
retriever = vectorstore.as_retriever()

# 5. 定义提示模板
prompt = hub.pull("rlm/rag-prompt")

# 辅助函数：格式化检索到的文档
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# 6. 构建RAG链
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# 7. 运行查询
result = rag_chain.invoke("What is Task Decomposition?")
print(result)
```

## 4\. 编程与代码生成中的提示工程

在软件开发中应用提示工程技术

### 4.1 代码生成与补全

#### 4.1.1 从自然语言生成代码

从自然语言描述生成代码是大型语言模型（LLM）在软件开发领域最具革命性的应用之一。通过精心设计的提示，开发者可以引导 LLM 将高层次的需求描述转换为具体的、可执行的代码片段、函数，甚至是整个程序。

##### 关键要素

*   • 明确目标编程语言
*   • 详细的功能逻辑描述
*   • 输入输出格式要求
*   • 特定的编码规范或风格

#### 4.1.2 代码补全与重构

除了从零开始生成代码，LLM 在代码补全和重构方面也展现出强大的能力。在集成开发环境（IDE）中，代码补全功能可以根据当前代码的上下文，智能地预测并建议接下来可能要输入的代码。

##### 智能代码补全

基于上下文理解编程意图

##### 代码重构建议

优化代码结构和可读性

#### 代码示例：生成特定功能的代码片段

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 定义用于代码生成的提示
code_generation_prompt = """
You are an expert Python developer. Write a Python function that validates an email address based on a standard format.

Requirements:
1. The function should be named `is_valid_email`.
2. It should take a single string argument, `email`.
3. It should return `True` if the email is in a valid format, and `False` otherwise.
4. Use regular expressions (regex) for the validation.
5. The regex should check for a standard format: a local part, an "@" symbol, and a domain part.
6. Include a docstring explaining the function's purpose, arguments, and return value.
7. Provide a few example usages of the function in the comments.

Please provide only the Python code, without any additional explanations.
"""

try:
    # 调用 OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": code_generation_prompt}
        ],
        temperature=0.2,  # 使用较低的温度以获得更确定性的代码
        max_tokens=500
    )

    # 提取并打印生成的代码
    generated_code = response.choices[0].message.content.strip()
    print("--- 生成的代码 ---")
    print(generated_code)

except Exception as e:
    print(f"An error occurred: {e}")
```

### 4.2 代码解释与调试

#### 4.2.1 解释复杂代码逻辑

大型语言模型（LLM）在解释复杂代码逻辑方面是一个极其有价值的工具。对于开发者来说，理解一段不熟悉的、复杂的或遗留的代码库往往是一项耗时且具有挑战性的任务。

##### 最佳实践

*   • 明确要求特定的详细程度
*   • 指定目标受众（如初级开发者）
*   • 请求逐行解释
*   • 要求说明算法和设计模式

#### 4.2.2 识别并修复代码错误

LLM 不仅能解释代码，还能在调试过程中扮演"结对编程伙伴"的角色，帮助开发者识别和修复代码中的错误。当开发者遇到一个难以解决的 bug 时，可以将出错的代码片段以及相关的错误信息一并提供给 LLM。

##### 错误分析

分析代码执行流程，定位逻辑缺陷

##### 修复建议

提供具体的修改建议和修复后的代码

#### 代码示例：调试 Python 脚本

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 包含错误的 Python 代码
buggy_code = """
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    average = total / len(numbers)
    return average

# 测试代码
my_list = [10, 20, 30]
print("Average:", calculate_average(my_list))

# 这行代码会导致错误
empty_list = []
print("Average of empty list:", calculate_average(empty_list))
"""

# 定义用于调试的提示
debug_prompt = f"""
The following Python code is intended to calculate the average of a list of numbers.
However, it contains a bug that causes a runtime error when the input list is empty.

Please do the following:
1. Identify the bug and explain why it occurs.
2. Provide a corrected version of the `calculate_average` function that handles the edge case of an empty list gracefully (e.g., by returning `None` or `0`).

Buggy Code:
```python
{buggy_code}
```

Corrected Code:
"""

try:
    # 调用 OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": debug_prompt}
        ],
        temperature=0.2,
        max_tokens=600
    )

    # 提取并打印调试结果
    debug_result = response.choices[0].message.content.strip()
    print("--- 调试结果 ---")
    print(debug_result)

except Exception as e:
    print(f"An error occurred: {e}")
```

### 4.3 自动化测试用例生成

#### 4.3.1 为函数生成单元测试

自动化测试是确保软件质量的关键环节，而编写全面的测试用例往往是一项繁琐且耗时的工作。大型语言模型（LLM）可以极大地简化这一过程，通过分析函数的代码逻辑，自动生成相应的单元测试。

##### 测试覆盖范围

*   • 正常情况测试
*   • 边界条件测试
*   • 异常情况测试

*   • 有效输入验证
*   • 无效输入处理
*   • 空值和极值测试

#### 代码示例：使用提示生成测试代码

```python
import os
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 需要生成测试的函数
function_to_test = """
def is_palindrome(s):
    \"\"\"Check if a given string is a palindrome, ignoring case and non-alphanumeric characters.\"\"\"
    import re
    cleaned = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
    return cleaned == cleaned[::-1]
"""

# 定义用于生成测试的提示
test_generation_prompt = f"""
You are an expert Python developer specializing in test-driven development (TDD).
Your task is to generate a comprehensive set of unit tests for the following Python function.

Function to test:
```python
{function_to_test}
```

Requirements for the tests:
1. Use the `unittest` framework.
2. The test class should be named `TestIsPalindrome`.
3. Include test cases for:
    - Typical palindromes (e.g., "racecar", "A man, a plan, a canal: Panama").
    - Non-palindromes (e.g., "hello", "python").
    - Edge cases: empty string (""), single character ("a"), strings with only non-alphanumeric characters ("!!!").
    - Case insensitivity ("RaceCar").
    - Strings with mixed alphanumeric characters and punctuation ("Was it a car or a cat I saw?").
4. Each test case should have a descriptive name (e.g., `test_palindrome_with_punctuation`).
5. Provide the complete, runnable test code.

Please provide only the Python test code, without any additional explanations.
"""

try:
    # 调用 OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": test_generation_prompt}
        ],
        temperature=0.2,
        max_tokens=800
    )

    # 提取并打印生成的测试代码
    generated_test_code = response.choices[0].message.content.strip()
    print("--- 生成的单元测试代码 ---")
    print(generated_test_code)

except Exception as e:
    print(f"An error occurred: {e}")
```

## 5\. 最佳实践与常见陷阱

提升提示工程效果的实用指南

### 5.1 设计高效提示的原则

#### 明确性与具体性

确保提示清晰地定义任务目标、范围和期望的输出格式。避免模糊的描述，使用具体的、可衡量的标准。

#### 避免歧义

提供足够的上下文信息消除多义性，使用结构化指令明确执行顺序，避免语法和结构上的模糊性。

#### 迭代优化

将提示工程视为持续的改进循环，通过测试、评估和修改不断提升提示效果，记录每次修改的影响。

#### 提示优化 checklist

##### ✓ 任务定义

*   • 明确说明需要完成的任务
*   • 指定编程语言和框架
*   • 定义输入输出格式

##### ✓ 质量要求

*   • 指定代码风格和规范
*   • 要求错误处理和边界条件
*   • 包含测试和文档要求

### 5.2 常见陷阱与解决方案

#### 5.2.1 提示注入 (Prompt Injection)

提示注入是一种针对大型语言模型（LLM）的安全漏洞，攻击者通过精心构造的恶意输入，试图覆盖或绕过模型原有的指令，从而诱导模型执行非预期的操作或泄露敏感信息。

##### 防御策略

*   • 用户输入过滤和清洗
*   • 使用分隔符和结构化输入
*   • 提示加固技术

*   • 输出监控和过滤
*   • 多层次安全策略
*   • 定期安全审计

#### 5.2.2 模型幻觉 (Hallucination)

模型幻觉是指大型语言模型（LLM）在生成文本时，产生看似合理但实际上是虚假或不准确的信息的现象。这在需要高度准确性的领域（如医疗、法律、金融）可能带来严重问题。

##### 缓解策略

*   • 明确要求基于提供的信息回答
*   • 使用检索增强生成（RAG）
*   • 提供可靠的参考来源

*   • 事实核查和验证
*   • 设置保守的生成边界
*   • 多模型交叉验证

#### 5.2.3 偏见与公平性

大型语言模型（LLM）在训练过程中会不可避免地学习并放大其训练数据中存在的社会偏见，这可能导致模型在生成内容时表现出对某些群体的不公平或歧视性倾向。

##### 解决方案

*   • 构建平衡和多样化的训练数据
*   • 使用去偏见技术进行微调
*   • 设计公平的提示指南

*   • 输出后处理和审查
*   • 多元化评估团队
*   • 建立公平性指标

### 5.3 性能优化策略

#### 控制 Token 数量

*   • 精简提示内容，去除冗余信息
*   • 使用摘要技术提取关键信息
*   • 设置 max\_tokens 限制输出长度
*   • 采用分块处理长文本

#### 优化 API 调用成本

*   • 选择性价比最高的模型
*   • 利用缓存机制减少重复调用
*   • 优化提示提高效率
*   • 监控和分析API使用情况

#### 评估与监控模型输出

*   • 使用自动评估指标（ROUGE、BLEU）
*   • 建立人工评估流程
*   • 实时监控异常输出
*   • 构建完整的质量管理体系

## 总结与展望

提示工程作为一门新兴的学科，正在快速发展。随着大型语言模型的不断进步，提示工程技术也将持续演进。掌握这些核心概念和技术，将帮助开发者更好地利用AI的能力，构建更智能、更可靠的应用程序。

### 关键要点

#### 技术核心

*   • 理解模型工作原理是基础
*   • 结构化提示提高输出质量
*   • 上下文管理是关键技能
*   • 迭代优化是不可或缺的过程

#### 发展方向

*   • 自动化提示生成工具
*   • 多模态提示工程技术
*   • 个性化提示优化
*   • 安全性和伦理考量

## 参考文献

**OpenAI 最佳实践指南:** [Best Practices for Prompt Engineering with the OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)

**检索增强生成教程:** [Retrieval Augmented Generation - Practical Tutorial](https://okram.co.in/retrieval-augmented-generation-practical-tutorial/)

**LangChain RAG 实现指南:** [LangChain Tutorials - RAG](https://blog.frognew.com/library/agi/langchain/tutorials/rag.html)

**腾讯云知识引擎文档:** [腾讯云知识引擎原子能力](https://cloud.tencent.com/document/product/1772/115969)

**微软 Azure OpenAI 文档:** [Azure OpenAI ChatGPT 快速入门](https://learn.microsoft.com/zh-cn/azure/ai-foundry/openai/chatgpt-quickstart)
