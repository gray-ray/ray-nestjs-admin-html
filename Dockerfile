
# 使用官方的 Node.js 镜像作为基础镜像
# 
FROM node:18-alpine AS build


# 设置工作目录
WORKDIR /home/ray/workspace

# 配置 npm 使用阿里镜像源
RUN npm config set registry https://registry.npmmirror.com


# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./
COPY tsconfig*.json ./

# 安装依赖，
RUN npm install

# 将应用源代码复制到工作目录
COPY . .

# 构建  项目
RUN npm run build

# 调试构建输出
#RUN ls -al /home/ray/workspace/dist


# 使用 Nginx 作为生产环境的服务器
FROM nginx:alpine


# 将构建结果从 build 镜像中复制到 Nginx 的静态文件目录
# 用了一个名称为 build 的阶段 在第一行定义
COPY --from=build /home/ray/workspace/dist /usr/share/nginx/html

# 暴露 Nginx 默认端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]