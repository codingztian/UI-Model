let _UserName,_UserPwd,_NserPwdTwo,_UserCode;
$("#username").blur(function(){
    let reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
    if(!reg.test($(this).val())){
        $("#nameReg").html("<i class='glyphicon glyphicon-remove'></i> 用户名格式错误或含有特殊字符");
        _UserName = false;
    } else {
        $("#nameReg").html(" ");
        _UserName = true;
    }
})
$("#userpwd").blur(function(){
    let reg = /^\w{6,17}$/;
    if(!reg.test($(this).val())){
        $("#pwdReg").html("<i class='glyphicon glyphicon-remove'></i> 密码长度太短或含有特殊字符");
        _UserPwd = false
    } else {
        $("#pwdReg").html(" ");
        _UserPwd = true;
    }
})
$("#_userpwd").blur(function(){
    if($(this).val() !== $("#userpwd").val()){
        $("#_pwdReg").html("<i class='glyphicon glyphicon-remove'></i> 两次密码输入不一致");
        _NserPwdTwo = false
    } else {
        $("#_pwdReg").html(" ");
        _NserPwdTwo = true;
    }
})
$("#codetxt").blur(function(){
    if($(this).val() == codeMa){
        $("#codeReg").html(" ");
        _UserCode = true;
    } else {
        $("#codeReg").html("<i class='glyphicon glyphicon-remove'></i> 验证码错误");
        _UserCode = false
    }
})