---
title: Docker 小白极速入门笔记
description: 容器、镜像、Compose 与常用命令——一次打包，到处运行
date: 2026-03-13
category: engineering
tags:
  - Docker
  - DevOps
  - Tools
draft: false
translationKey: docker-quickstart
originalSource: https://blog.csdn.net/Xu_youyaxianshen
---

> 本文由 CSDN 原创同步至本站。首发：[CSDN · Xu_youyaxianshen](https://blog.csdn.net/Xu_youyaxianshen?type=blog)

## 一、Docker是什么？（一句话理解）

> **Docker = 集装箱 + 快递系统**
>
> 把你的应用和运行环境打包成一个"集装箱"（镜像），无论在哪台机器上都能一模一样地运行。

**传统问题**："我电脑上能跑，服务器上跑不了"
**Docker解决**：一次打包，到处运行

---

## 二、核心概念（3个必须记住）

| 概念                 | 比喻         | 作用                           |
| -------------------- | ------------ | ------------------------------ |
| **镜像 (Image)**     | 集装箱模板   | 应用的打包文件，只读           |
| **容器 (Container)** | 运行的集装箱 | 镜像的实例，可运行、可修改     |
| **仓库 (Registry)**  | 码头仓库     | 存放镜像的地方（如Docker Hub） |

**关系**：镜像 → 运行 → 容器（一个镜像可以生成多个容器）

---

## 三、安装Docker

### Linux（Ubuntu/Debian）

```bash
# 一键安装脚本
curl -fsSL https://get.docker.com | sh

# 启动服务
sudo systemctl start docker
sudo systemctl enable docker

# 免sudo使用（需重新登录）
sudo usermod -aG docker $USER
```

### Mac/Windows

直接下载 Docker Desktop 安装即可：[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

---

## 四、最常用命令（掌握这10个就够了）

### 1. 镜像操作

```bash
# 搜索镜像（以nginx为例）
docker search nginx

# 下载镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx
```

### 2. 容器操作（⭐重点）

```bash
# 运行容器（最简单的例子）
docker run -d -p 80:80 --name mynginx nginx

# 解释：
# -d        后台运行（detached）
# -p 80:80  端口映射（主机端口:容器端口）
# --name    给容器起名字
# nginx     使用的镜像

# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 停止容器
docker stop mynginx

# 启动已停止的容器
docker start mynginx

# 重启容器
docker restart mynginx

# 删除容器
docker rm mynginx

# 强制删除运行中的容器
docker rm -f mynginx
```

### 3. 进入容器内部（调试必备）

```bash
# 进入容器的命令行（类似SSH）
docker exec -it mynginx /bin/bash

# 解释：
# -i        交互模式
# -t        分配伪终端
# /bin/bash 使用的shell
```

### 4. 查看日志

```bash
# 查看容器日志
docker logs mynginx

# 实时跟踪日志（类似tail -f）
docker logs -f mynginx
```

---

## 五、实战：部署一个网站（5分钟上手）

### 步骤1：运行Nginx

```bash
docker run -d -p 8080:80 --name myweb nginx
```

现在访问 `http://localhost:8080` 就能看到Nginx欢迎页了！

### 步骤2：修改网站内容

```bash
# 进入容器
docker exec -it myweb /bin/bash

# 在容器内修改首页
echo "<h1>Hello Docker!</h1>" > /usr/share/nginx/html/index.html

# 退出容器
exit
```

刷新浏览器，页面已改变！

### 步骤3：保存你的修改（创建新镜像）

```bash
# 将容器保存为新镜像
docker commit myweb mynginx:v1.0

# 查看新镜像
docker images
```

---

## 六、数据持久化（防止数据丢失）

**问题**：删除容器，数据就没了！
**解决**：使用数据卷（Volume）

```bash
# 方式1：挂载主机目录
docker run -d -p 8080:80 -v /home/user/html:/usr/share/nginx/html nginx

# 方式2：使用命名卷（Docker管理）
docker run -d -p 8080:80 -v mydata:/usr/share/nginx/html nginx
```

---

## 七、Docker Compose（多容器管理）

一个文件管理多个容器，比如：Web + 数据库

创建 `docker-compose.yml`：

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

启动：

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down
```

---

## 八、快速清理（释放空间）

```bash
# 删除所有停止的容器
docker container prune

# 删除所有未使用的镜像
docker image prune

# 删除所有未使用的数据卷
docker volume prune

# 一键清理所有（慎用！）
docker system prune -a
```

---

## 九、常用镜像推荐

| 镜像   | 用途       | 快速运行命令                                                 |
| ------ | ---------- | ------------------------------------------------------------ |
| nginx  | Web服务器  | `docker run -d -p 80:80 nginx`                               |
| mysql  | 数据库     | `docker run -d -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 mysql` |
| redis  | 缓存       | `docker run -d -p 6379:6379 redis`                           |
| ubuntu | 测试环境   | `docker run -it ubuntu bash`                                 |
| python | Python环境 | `docker run -it python:3.9 bash`                             |

---

## 十、学习路线图

```
第1天：掌握基础命令（run, ps, stop, rm, exec）
    ↓
第2天：练习数据卷挂载（-v）
    ↓
第3天：学习Dockerfile打包自己的应用
    ↓
第4天：掌握Docker Compose多容器编排
    ↓
第5天：了解Docker网络、仓库等进阶内容
```

---

## 备忘清单（建议收藏）

```bash
# ===== 快速启动常用服务 =====
# MySQL
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 mysql

# Redis
docker run -d --name redis -p 6379:6379 redis

# Ubuntu测试环境
docker run -it --name ubuntu ubuntu bash

# ===== 常用查看命令 =====
docker ps           # 看运行中的容器
docker ps -a        # 看所有容器
docker images       # 看镜像
docker volume ls    # 看数据卷
docker network ls   # 看网络

# ===== 快速清理 =====
docker rm -f $(docker ps -aq)    # 删除所有容器
docker rmi $(docker images -q)   # 删除所有镜像
```
