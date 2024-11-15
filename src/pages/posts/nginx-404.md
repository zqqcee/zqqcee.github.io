---
title: 解决nginx访问动态接口报错404Not Found问题
tags: nginx
categories: others
description: 计设做了一套招聘背调系统，前后端分别使用了Ant Design Vue与JFinal框架。想要将项目部署到服务器上，但是外部访问一直报错404Not Found，记录解决方法
date: 2021-07-30
layout: ../../layouts/PostLayout.astro
mathjax: true
hidden: true
abbrlink: 41490
---

## 问题描述

计设做了一套招聘背调系统，前后端分别使用了Ant Design Vue与JFinal框架。想要将项目部署到服务器上，但是外部访问一直报错404Not Found
![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181520276.png)

## 解决思路

把错误定位为：找不到动态接口，但是不知道是项目中出现了问题，还是经nginx代理后出现了问题。
因此要分别测试 项目本身的接口 和 nginx代理后的接口。

##### 首先测试项目内接口：

在ubuntu端输入命令：curl http://localhost:port/xxx/xxx

```
这里我的接口是： curl http://localhost:20294/sys/login
```

运行结果：
![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181520630.png)
说明我的项目内接口是没有问题的。

##### 再测试nginx代理后的接口：

再ubuntu中输入命令

```
curl http://localhost:8080/api/user/login
```

运行结果：
![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181520460.png)
这里提示找不到接口了，说明问题出在代理服务器nginx上，所以我们要去修改nginx的配置文件。

按照其他博客的建议，我将nginx配置中这个地方加上了斜杠
![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181520853.png)
重启服务器后，还是不行。

#### 彻底解决

在当我不知道怎么办的时候，我突然发现我的服务器中，**有两个nginx·····**
我在想是不是因为有两个nginx，修改的配置文件不是我启动的那个nginx。于是我把所有nginx配置文件都替换成我原始的配置文件，再重启。还是不行

担心是两个nginx的问题，我把服务器中的所有nginx删除了。删除步骤（依次运行下面的步骤）：

```
ps aux|grep nginx  #查看nginx进程
kill -9 进程号      #杀死上一步中查询到的nginx（进程号在第二列）
find / -name nginx #找到nginx的文件地址
rm -rf xxx         #删除nginx所有文件
```

最后用weget安装新的nginx，然后按照原本安装步骤进行安装，修改配置文件后，再运行curl访问动态接口，突然就可以了!

下面贴出我的nginx配置文件:

```bash
user root;
#user  nobody;
worker_processes  4;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    server_names_hash_bucket_size 128;
    client_header_buffer_size 32k;
    underscores_in_headers on;
    large_client_header_buffers 4 32k;
    client_max_body_size 50m;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;

    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nopush          on;
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout    300;
    fastcgi_read_timeout    300;
    fastcgi_buffer_size     64k;
    fastcgi_buffers     4   64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 256k;
    tcp_nodelay         on;

    #gzip  on;


    ######################################################
    #############     麻雀配置地址    ###########
    ######################################################
    server {
        listen       8080;
        server_name  somename;

        location /api/ {
            proxy_pass http://0.0.0.0:20294/; #映射到本地端口。
            proxy_redirect off;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size 200m;
            proxy_connect_timeout 600;
            proxy_read_timeout 600;
        }

        location / {
            root /root/project-template/config/static;
            try_files $uri $uri/ @router;
            index index.html;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size 200m;
            proxy_connect_timeout 600;
            proxy_read_timeout 600;
        }

        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
}

```

<font color="blue" size="4">需要注意的是：配置动态访问api的时候，记得在最后加上斜杠</font>

![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181520695.png)

至此，问题完美解决。
