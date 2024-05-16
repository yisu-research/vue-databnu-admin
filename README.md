# Docker

输入以下命令，来构建镜像：

```
docker build -f ./Dockerfile . -t databnu-admin:v1
```

输入以下命令，来后台启动镜像：

```
docker run -d -p 6018:80 databnu-admin:v1
```

其中，`6018`为端口号。
