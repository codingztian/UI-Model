
/* modules */
const express = require("express");                   // express
const app = express();		
const fs = require("fs");							  // fs
const router = require("./router/router");            // 路由表
const bobyParser = require("body-parser");            // post请求
const session = require("express-session");           // session模块


// session
app.use(session({
	secret: 'keyboard cat',							  // 秘锁 加密的
	resave: false,	
	saveUninitialized: true,
}));
// 获取 Post 数据 
app.use(bobyParser.urlencoded({ extended: false }));
// 静态页面
app.use("/public", express.static("./public"));
// index.html
app.get("/", (req, res) => fs.readFile("./views/index.html",(err, data) => res.end(data)));
// 登录
app.get("/users/login", (req, res) => fs.readFile("./views/users/login.html",(err, data) => res.end(data)));
// 注册
app.get("/users/regist", (req, res) => fs.readFile("./views/users/regist.html",(err, data) => res.end(data)));
// 资料
app.get("/users/center", (req, res) => fs.readFile("./views/users/center.html",(err, data) => res.end(data)));
// 关于
app.get("/about", (req, res) => fs.readFile("./views/main/about.html",(err, data) => res.end(data)));
// mask 详情
app.get("/mask",(req, res) => fs.readFile("./views/main/mask.html",(err, data) => res.end(data)));
// search
app.get("/search",function(req, res) {
	exports.keys = req.query.search;
    fs.readFile("./views/main/search.html",(err, data) => res.end(data));
});


// 路由表
app.post("/regist", router.regist);				// 注册验证
app.post("/login", router.login);				// 登录验证
app.get("/exit",router.exit);					// 退出登录
app.get("/personGetdata", router.personGet) 	// 个人信息获取
app.get("/personUpdate", router.personUp)		// 个人信息修改
app.get("/searchKey", router.search);			// search 数据获取
app.get("/model", router.model);				// model 数据获取
app.get("/commentUp", router.comment);			// comment 评论发表
app.get("/commentGet", router.commentGet)		// comment 评论获取
app.get("/case", router.case)			// viewDate


// 运行服务器
app.listen(80); 