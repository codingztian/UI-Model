// 脚注操作
(function(){
    $(".footer").eq(0).append(creatEle());
    function creatEle(){
        const $footer = $(`
            <div class="container footerFlex">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="contant">联系我们</div>
                        <div class="contant">/ contant</div>
                    </div>
                    <div class="col-sm-4">
                        <div class="contantTxt">地址：湖北省 武汉市 蔡甸区 长江大学 </div>
                        <div class="contantTxt">电话：13207196768</div>
                        <div class="contantTxt">QQ：1367933803</div>
                        <div class="contantTxt">邮编：431623</div>
                    </div>
                    <div class="col-sm-4">
                        <div class="contantTxt">邮箱：
                        <a href="javascript:void(0)">codingztian@sina.com</a>
                        </div>
                        <div class="contantTxt">网址：
                        <a target="_blank" href="http://codingztian.com/">www.codingztian.com</a>
                        </div>
                        <div class="contantTxt">Gtihub：
                        <a target="_blank" href="https://GitHub.com/codingztian">www.github.com/codingztian</a>
                        </div>
                        <div class="contantTxt">BLOG：
                        <a target="_blank" href="https://me.csdn.net/CodingmanNAN">www.csdn.net/CodingmanNAN</a>
                        </div>
                    </div>  
                    <div class="col-sm-2">
                        <div class="contantTxt">WeChat</div>
                        <div class="wechat"></div>
                    </div>
                </div>  
            </div>
            <div class="Bei">
                <p>Copyright © 2020 CodingScript 鄂ICP备20002145号</p>
            </div>
            <div class="scollTop">
                <i class="glyphicon glyphicon-chevron-up"></i>
            </div>`);
        return $footer;
    }
})();

// ✈
(function(){
    let timer = null;
    $(".scollTop").eq(0).slideUp(0);
    $(window).scroll(() => {
        if(document.documentElement.scrollTop <= 760){
            $(".scollTop").eq(0).slideUp();
        } else {
            $(".scollTop").eq(0).slideDown();
        }
    })
    $(".scollTop").eq(0).on("click", () => {
        timer = setInterval(change,1);
    });
    function change(){
        if(document.documentElement.scrollTop <= 0){
            clearInterval(timer);
        }else{
            document.documentElement.scrollTop -= 30	;
        }
    }
})();