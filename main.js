const express = require('express');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
const cors = require("cors");

const SECRET = "sczLoveStudy";

const app = express();
//解决跨域问题
app.use(cors());
//解析客户端请求的body中的内容
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//注册中间件，配置一个全局的token验证，path中的请求不需要token验证
app.use(expressJwt({secret: SECRET, algorithms: ['HS256']}).unless({path: ['/login', '/price']}));
//处理验证不通过的情况
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send("Token验证失败")
        // console.log(err)
    }
})

const connection = mysql.createConnection({
    host: 'localhost',
    // port: '3306',
    user: 'root',
    password: 'xqQA0930',
    database: 'express'
});

// 定义一个执行sql语句的函数并且返回一个promise对象
const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            resolve(result);
        });
    });
    return promise;
};

connection.connect()

app.post("/login", (req, res) => {
    // 从请求中获取请求体
    const {name, password} = req.body;
    const sql = `select * from admin where name='${name}'`;
    exec(sql).then((result) => {
        const user = result[0];
        // 如果查询不到用户
        if (!user) {
            res.send("用户名不存在");
            return;
        }
        // 判断用户输入的密码和数据库存储的是否对应 返回true或false
        if (password != user.password) {
            res.send("密码错误");
            return;
        }
        // 生成的token将用户的唯一标识，id作为第一个参数
        // SECRET作为取得用户id的密匙
        const token = jwt.sign({name: user.name}, SECRET, {expiresIn: '72h'});
        // 如果都通过了则返回oken
        res.send({token});
    });
});

//增
app.post('/addPrice', function (req, res) {
    let sql = 'insert into ckb_price set exchange=?,price_json=?'; //这边的"?"是SQL的模板语法
    let params = [req.body.exchange, req.body.price_json]  //这边的数组参数与上边的"?"一一映射
    connection.query(sql, params, function () {
        try {
            res.send({"msg": "增加数据成功", "status": 200});
        } catch (err) {
            res.status(400);
            res.send('增加数据失败');
        }
    });
})

//删
app.post('/deletePrice', function (req, res) {
    let sql = 'delete from ckb_price where exchange=?'
    let params = [req.body.exchange];
    connection.query(sql, params, function () {
        try {
            res.send({"msg": "删除数据成功", "status": 200});
        } catch (err) {
            res.status(400);
            res.send('删除数据失败');
        }
    });
})

//改
app.post('/updatePrice', function (req, res) {
    "{\"nervos-network\":{\"usd\":0.00367143}}"
    let sql = 'update ckb_price set price_json=? where exchange=?';
    let params = [req.body.price_json, req.body.exchange]
    connection.query(sql, params, function () {
        try {
            res.send({"msg": "修改数据成功", "status": 200});
        } catch (err) {
            res.status(400);
            res.send('修改数据失败');
        }
    });
})

//查
app.get('/price', function (req, res) {
    let sql = 'select price_json from ckb_price where exchange=?';
    let params = [req.query.exchange]
    connection.query(sql, params, function (_, result) {
        try {
            res.send(result[0]["price_json"])
        } catch (err) {
            res.status(400);
            res.send('查询失败');
            console.log(err)
        }
    });
})

app.listen(8088, () => {
    console.log("8088启动中...");
});


// connection.end()