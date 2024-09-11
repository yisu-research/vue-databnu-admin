# Docker

输入以下命令，来构建镜像：

```
docker build -f ./Dockerfile . -t databnu-admin:v1
```

输入以下命令，来基于指定的镜像在后台启动容器：

```
docker run -d -e BACKEND_HOST=8.130.113.83 -e BACKEND_PORT=8001 -p 8000:80 databnu-admin:v1
```

其中：
- `-p 8000:80`：将容器的8000端口映射到本机的8001端口。
- `-e BACKEND_HOST=8.130.113.83`：`BACKEND_HOST`为管理系统后台服务的主机IP地址。
- `-e BACKEND_PORT=8001`：`BACKEND_PORT`为管理系统后台服务的对应端口号。
