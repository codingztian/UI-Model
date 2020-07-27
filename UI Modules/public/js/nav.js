
// 导航栏操作
$(function() {
    /******************** 导航栏 渲染********************/
    $(".navFixed").eq(0).append(crearEle());
    function crearEle(){
        const $nav = $(`<nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <!-- <span class="sr-only">Toggle navigation</span> -->
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">UModel</a>
                </div>
                
                <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
                    
                    <ul class="nav navbar-nav navbar-left">
                        <li><a href="/">首页</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                功能模块
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="/#modelTo">class</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="/#viewTo">Case</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="/#demoTo">Demo</a></li>
                            </ul>
                        </li>
                        <li><a href="/about">关于</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" id="loginName">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" id="sname" data-toggle="dropdown" role="button"
                                aria-haspopup="true" aria-expanded="false"></a>
                            <ul class="dropdown-menu">
                                <li><a href="/users/center">个人中心</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="/users/center">个人中心</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="/users/center">个人中心</a></li>
                            </ul>
                        </li>
                        <li><a href="/users/login" id="exit">退出登录</a></li>
                    </ul>
                    <div class="nav navbar-nav navbar-right headerSea">
                        <form class="nav_searchDiv" action="/search" method="GET">
                            <input type="text" id="inp" name="search" class="nav_searchinp" placeholder="输入您要检索的关键字">
                            <button type="submit" class="nav_btnSear btn btn-default">
                                <div class="nav_searPic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>`);
        return $nav;
    }

    /******************** nav 动画 ********************/
    $(".navFixed").eq(0).fadeOut(0);
    $(".navFixed").eq(0).slideDown(1500);
    $(".nav_searchDiv").eq(0).fadeOut(0);
    $(window).scroll(() => {
        // nav 动画
        if($(".navbar").eq(0).offset().top > 0 && $(".navbar").eq(0).offset().top < 420){
            $(".navFixed").eq(0).slideUp(300);
            $(".nav_searchDiv").eq(0).fadeOut();
        } else if ($(".navbar").eq(0).offset().top >= 420){
            $(".navFixed").eq(0).slideDown(500);
            $(".navbar").eq(0).css({backgroundColor: "rgba(0, 0, 0, 0.6)"});
            $(".nav_searchDiv").eq(0).fadeIn();
        } else {
            $(".navFixed").eq(0).slideDown(500);
            if(window.innerWidth >= 768){
                $(".navbar").eq(0).css({backgroundColor: "rgba(0, 0, 0, 0)"});
            } else {
                $(".navbar").eq(0).css({backgroundColor: "rgba(0, 0, 0, 0.6)"});
            }
        }
    });

    /******************** 下拉框动画 ********************/
    if(window.innerWidth >= 768){
        $(".navFixed").delegate(".dropdown", "mouseenter", function(){
            $(this).find(".dropdown-menu").slideDown(300);
        });
        $(".navFixed").delegate(".dropdown", "mouseleave", function(){
            $(this).find(".dropdown-menu").slideUp(300);
        });
    }

    /******************** 登录显示模块 ********************/
    if (!localStorage.loginName) {
        $("#loginName").html(`<li><a href="/users/login">登录</a></li>
        <li><a href="/users/regist">注册</a></li>`);
    } else {
        $("#sname").html(`欢迎 ${localStorage.loginName} <span class="caret"></span>`)
    }
    
    // 退出登录 => 后台清除 session
    $("#exit").click(function () {
        localStorage.removeItem("loginName");
        $.ajax({
            type: "GET",
            url: "/exit",
            success: function (data) {
                if (data == 1) {
                    console.log("您已退出登录状态");
                } else if (data == 0) {
                    alert("退出登录状态失败");
                } else {
                    alert("服务器异常");
                }
            }
        });
        
    });
});





