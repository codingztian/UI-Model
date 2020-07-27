$(function() {
    $("#content").append($(`<img src="${localStorage.maskSrc}">`));
    $("#maskTitle").html(localStorage.maskTitle);
    // $("#maskTxt").html(localStorage.maskTxt);
    // 发表评论
    $("#messageBtn").on("mousedown", function(){
        $(this).css({color: "whitesmoke",backgroundColor: "#ff510f"}).mouseup(function(){
            $(this).css({color: "#ff510f",backgroundColor: "transparent"});
        });
        if(localStorage.loginName){
            if($("#messageTxt").val()){
                $("#messageList").prepend(creatMes({
                    user: localStorage.loginName,
                    txt: $("#messageTxt").val(),
                    time: formDate(new Date())
                }));
                $.ajax({
                    type: "GET",
                    url: "/commentUp",
                    data:{
                        id: localStorage.maskID,
                        comment: {
                            user: localStorage.loginName,
                            txt: $("#messageTxt").val(),
                            time: formDate(new Date())
                        }
                    },
                    success: function (data) {
                        if (data == 1) {
                            alert("评论成功");
                        } else if (data == 0) {
                            alert("评论失败");
                        } else {
                            alert("服务器异常");
                        }
                    }
                });
                $("#messageTxt").val("");
            } else {
                console.log("评论不能为空 ~~");
            }
        } else {
            alert("请登录后再来发表评论");
            window.location = "/users/login";
        }
    });

    // 获取评论
    $.ajax({
        type: "GET",
        url: "/commentGet",
        data:{
            id: localStorage.maskID,
            comment: {
                user: localStorage.loginName,
                txt: $("#messageTxt").val(),
                time: formDate(new Date())
            }
        },
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#messageList").html("<h3 class='notComment'>暂无评论</h3>");
            } else {
               data.forEach(value => {
                    $("#messageList").prepend(creatMes({
                        user: value.user,
                        txt: value.txt,
                        time: value.time
                    }));
               });
            }
        }
    });

    function creatMes(option){
        return $(`<div class="row">
            <div class="col-xs-2"><div class="list_pho"></div></div>
            <div class="col-xs-10">
                <div class="list_name">${option.user}</div>
                <div class="list_txt">${option.txt}</div>
                <div class="list_info"><span class="list_time">${option.time}</span></div>
            </div>
        </div>`);
    }
    function formDate(time){
        let hours = time.getHours();
        let min = time.getMinutes()
        let src = time.getSeconds();
        hours > 9 ? hours : hours = "0" + hours;
        min > 9 ? min : min = "0" + min;
        src > 9 ? src : src = "0" + src;
        return [
            time.getFullYear() + "年",
            time.getMonth() + 1 + "月",
            time.getDate() + "日 ",
            hours + ":" + min + ":" + src,
        ].join("");
    }
});

