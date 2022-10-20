本地安装mysql，创建数据库，通过sql文件夹下的sql文件新增相应表后即可使用。
* 创建数据库
```
CREATE DATABASE express;
```
* 启动应用
```
npm install
npm install -g pm2
pm2 start main.js
```
* 查看进程状态、日志
```
pm2 ls
pm2 logs
```
除了查询、登录接口，其他接口都需要传入token，token通过调用登录接口获得。向postman导入myCkbPrice.postman_collection.json，调用这些接口。