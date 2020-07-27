
// 验证码
var canvas_02 = document.getElementById("codeMa");
// canvas_02.width = 600;		
	canvas_02.width = 120;
// canvas_02.height = 200;		
	canvas_02.height = 40;
let codeMa = change_code().join("");
canvas_02.onclick = function(){
    codeMa = change_code().join("");
}
function change_code(){
    canvas_02.style.backgroundColor = random_color_bg();
    var cxt_02 = canvas_02.getContext("2d");	// 创建canvas对象
    var wid = canvas_02.width;	// 画布 宽
    var hei = canvas_02.height;	// 画布 高
    var random_rotate = null;	// 随机旋转角
    var arr_code = random_code();
    var tmp = wid / 5, tmpLine = hei / 6;	
    cxt_02.clearRect(0, 0, wid, hei);	// clear
    cxt_02.font = "bold " + hei * 2 / 3  + "px 宋体";
    // 随机旋转角
    for(var i = 0; i < arr_code.length; i++){
        cxt_02.save();
        cxt_02.fillStyle = random_color_font();
        cxt_02.translate(tmp,hei * 2/3);
        random_rotate =  Math.PI/180 * Math.floor(Math.random() * 60);
        random_rotate = Math.random() > 0.5 ? random_rotate : -random_rotate;
        cxt_02.rotate(random_rotate);
        cxt_02.fillText(arr_code[i],0, 0);
        tmp +=  wid / 5;
        cxt_02.restore();	
    }
    // 5干扰线
    for(var j = 0; j < 5; j++){
        cxt_02.beginPath();
        cxt_02.moveTo(0, tmpLine); 
        cxt_02.lineTo(wid,tmpLine);
        cxt_02.strokeStyle = random_color_font();
        cxt_02.stroke();
        tmpLine += hei / 6;
        cxt_02.closePath();
    }
    // 50散点
    for(var k = 0; k < 50; k++){
        cxt_02.beginPath();
        cxt_02.arc(Math.floor(Math.random() * wid), Math.floor(Math.random() * hei), 1, 0, Math.PI * 2);
        cxt_02.strokeStyle = random_color_font();
        cxt_02.stroke();
        cxt_02.closePath();
    }
    return arr_code;
}
// 浅色
function random_color_bg(){
    var r = 255 - Math.floor(Math.random() * 100);
    var g = 255 - Math.floor(Math.random() * 100);
    var b = 255 - Math.floor(Math.random() * 100);
    return "rgb(" + r + "," + g + "," + b + ")";
}
// 深色
function random_color_font(){
    var r = Math.floor(Math.random() * 150);
    var g = Math.floor(Math.random() * 150);
    var b = Math.floor(Math.random() * 150);
    return "rgb(" + r + "," + g + "," + b + ")";
}
// 四位随机字符
function random_code(){
    var letters = [],	chars = [];
    for(var i = 48;i <= 57;i++)				// 数字
        if(i != 54 && i != 57 && i != 49)	// 剔除 6 9 1
            letters.push(String.fromCharCode(i));
    for(var i = 65;i <= 90;i++)				// 大写
        letters.push(String.fromCharCode(i));
    for(var i = 97;i <= 122;i++)			// 小写
        if(i != 108)						// 剔除 l
            letters.push(String.fromCharCode(i));
    for(var j = 0; j <= 3; j++){
        var n = parseInt(Math.random() * letters.length);
        chars.push(letters[n]);
        letters.splice(n,1);
    }
    return chars;
}