$(function() {
    if(localStorage.loginName)  
        $(".personName").eq(0).html(localStorage.loginName);
    (function(){
        let title = {
            "nameVal": ["text", "昵称"],
            "ageVal": ["number", "年龄"],
            "telVal": ["tel", "电话"],
            "emailVal": ["email", "邮箱"],
            "addVal": ["text", "地址"],
            "industryVal":["text", "行业"],
            "companyVal": ["text", "公司"],
            "IntroductionVal": ["text", "简介"],
        }
        $.each(title, (index, value) => $("#sec").append(creatEle(index, value)) );
        function creatEle(index, option){
            return $(`<div class="form-group">
                    <label class="col-sm-2 control-label">${option[1]}</label>
                    <div class="col-sm-10">
                        <input type="${option[0]}" class="form-control" id="${index}">
                    </div>
                </div>
            `);
        }
    })();

    // 个人信息修改自动获取
    $.ajax({
        type: "GET",
        url: "/personGetdata",
        success: function (data) {
            if(data == 0){
                console.log("个人信息获取异常");
            } else {
                $.each(data, (index, value) => {
                    $("#"+index+"Val").val(value);
                })
            }
        }
    });

    // 个人信息修改
    $("#btn").click(function(){
        $.ajax({
            type: "GET",
            url: "/personUpdate",
            data: {
                personData: {
                    "name": $("#nameVal").val(),
                    "age": $("#ageVal").val(),
                    "tel":$("#telVal").val(),
                    "email": $("#emailVal").val(),
                    "add": $("#addVal").val(),
                    "industry": $("#industryVal").val(),
                    "company": $("#companyVal").val(),
                    "Introduction": $("#IntroductionVal").val(),
                }
            },
            success: function (data) {
                alert("信息修改成功！")      
            }
        }); 
    });
})