// 加密函数
let crypot = require("crypto");             // 加密操作模块
module.exports = function (pwd) {
    let md5 = crypot.createHash("md5");
    let password = md5.update(pwd).digest("base64");
    return password;
}
