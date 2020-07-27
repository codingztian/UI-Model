
const md5 = require("../models/MD5");          // 加密
const db = require("../models/mongo_module")   // db 封装模板
const casedb = require("../models/case");
const ObjectId = require('mongodb').ObjectId;

// 注册路由
exports.regist = function(req, res) {
    console.log(req.body);
    username = req.body.username;
    userpwd = req.body.userpwd;
    db.find({
        "dbName": "UI_Management",              // 数据库名
        "collectionName": "user",               // 集合名
        "json": {
            "name":username                     // 查询条件
        },                                
        "callback": function(err, result) {     // 查询结果
            if(result.length == 0){
                db.insertOne("UI_Management", "user", {
                        "name": username,
                        "pwd": userpwd
                    }, (err, result) => {
                        req.session.name = username;
                        res.send(["1",username]);
                });
            } else {
                res.send("0");
            }
        },
        "pageAttr": {                       
            "pageAmount":null,      // 每页数据量
            "page":null             // 第page页
        },
        "sort":{}                   // 排序     1:升序  -1:降序
    });

}

// 登录路由     
exports.login = function(req, res) {
    username = req.body.username;
    userpwd = req.body.userpwd;
    // userpwd = md5(userpwd);                  // MD5 加密
    console.log(req.body);
    db.find({
        "dbName": "UI_Management",              // 数据库名
        "collectionName": "user",               // 集合名
        "json": {
            "name":username                     // 查询条件
        },                                      
        "callback": function(err, result) {     // 查询结果
            if(result.length == 0){
                res.send("0");
            } else {
                if(result[0].pwd === userpwd){ 
                    req.session.name = username;
                    res.send(["1",username]);
                } else {
                    res.send("-1");
                }
            }
        },
        "pageAttr": {                       
            "pageAmount": null,     // 每页数据量
            "page": null            // 第page页
        },                             
        "sort":{}                  // 排序     1:升序  -1:降序
    });
}

// 退出
exports.exit = function(req, res) {
    req.session.name = null;
    if(req.session.name){
        res.send("0");
    } else {
        res.send("1");
    }
}

// 获取个人资料
exports.personGet = function(req, res) {
    db.find({
        "dbName": "UI_Management",              // 数据库名
        "collectionName": "user",               // 集合名
        "json": {
            "name": req.session.name                    // 查询条件
        },                                      
        "callback": function(err, result) {     // 查询结果
            // console.log(result);    // result => [{personData:{...},...}]
            if(req.session.name && result[0].personData){
                res.send(result[0].personData);
            } else {
                res.send("0");
            }
        },
        "pageAttr": {                       
            "pageAmount": null,     // 每页数据量
            "page": null            // 第page页
        },                             
        "sort":{}                  // 排序     1:升序  -1:降序
    });
}

// 个人资料修改     
exports.personUp = function(req, res) {
    console.log(req.query);
    db.updateMany("UI_Management", "user", {"name": req.session.name},{$set: req.query}, (err, result) => res.send(result));
}

// search 
// db.getCollection('search').find({"keys" :{$regex:"京"}}) 模糊查询
// mongoimport --db UI_Management --collection search --drop --file C:\Users\..\search.json
let search = require("../app");
exports.search = function(req, res) {
    console.log(search);
    db.find({
        "dbName": "UI_Management",              // 数据库名
        "collectionName": "search",             // 集合名
        "json": {
            "keys": {$regex:search.keys}        // 模糊查询条件
        },                                      
        "callback": function(err, result) {     // 查询结果
            if(result.length){
                res.send(result);
            } else {
                res.send("0");
            }
        },
        "pageAttr": {                       
            "pageAmount": null,     // 每页数据量
            "page": null            // 第page页
        },                             
        "sort":{}                  // 排序     1:升序  -1:降序
    });
}

// model
exports.model = function(req,res) {
    // console.log(req.query);
    db.find({
        "dbName": "UI_Management",              // 数据库名
        "collectionName": "search",             // 集合名
        "json": {
            "keys": {$regex:req.query.keys} 
        },                                      
        "pageAttr": {                       
            "pageAmount": req.query.pageAmount,     // 每页数据量
            "page": req.query.page                  // 第page页
        },      
        "callback": function(err, result) {     // 查询结果
            if(result.length){
                res.send(result);
            } else {
                res.send("0");
            }
        },                       
        "sort":{}                  // 排序     1:升序  -1:降序
    });
}

// viewDate
exports.case = (req, res) => res.send(casedb.viewDate);

// comment 发表评论
exports.comment = function(req, res) {
    console.log(req.query.id);
    console.log(req.query.comment);
    db.updateMany("UI_Management", "search", 
        {
            "_id" : ObjectId(req.query.id),
        },
        {
            $addToSet: {
                comment:{
                    "user" : req.query.comment.user,"txt" : req.query.comment.txt,"time" : req.query.comment.time
                }
            }
        }, (err, result) => res.send("1"));
}

// commentGet 获取评论
exports.commentGet = function(req, res) {
    db.find({
        "dbName": "UI_Management",                  // 数据库名
        "collectionName": "search",                 // 集合名
        "json": {
            "_id" : ObjectId(req.query.id),        // 模糊查询条件
        },                                      
        "callback": function(err, result) {     // 查询结果
            if(result.length){
                res.send(result[0].comment);
            } else {
                res.send("0");
            }
        },
        "pageAttr": {                       
            "pageAmount": null,     // 每页数据量
            "page": null            // 第page页
        },                             
        "sort":{}                  // 排序     1:升序  -1:降序
    });
}

// mongodb 数据库中的一条记录的数据中改变数据的方法
// update({"name" : "Json"}, {$set:{comment:[{"user" : "...","txt" : "...","time" : "..."}]}});
// mongodb 数据库中的一条记录的数据中增加数据的方法
// update({"name" : "Json"}, {$addToSet:{comment:{"user" : "...","txt" : "...","time" : "..."}}});
// 这就是 一条记录的数据中增加数据的方法

// update(
//     {
//         "_id" : ObjectId("5e9ea8a00aff6107272b81d0")
//     }, 
//     {
//         $addToSet: {
//             comment: {
//                 "user" : "Naa",
//                 "txt" : "江、山、湖、城之胜、明殿宇建筑风格，大处着眼",
//                 "time" : "2020年4月22日 03:30:33"
//             }
//         }
//     }
// );