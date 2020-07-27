
/******************** 轮播图模块 ********************/
$(function() {
    // 背景地址
    let url = [
        "/public/img/searchBG/img3.jpg",
        "/public/img/searchBG/img4.jpg",
        "/public/img/searchBG/img5.jpg",
        "/public/img/searchBG/img6.jpg",
        "/public/img/searchBG/img7.jpg",
        "/public/img/searchBG/img10.jpg",
        "/public/img/searchBG/img12.jpg",
        "/public/img/searchBG/img13.jpg",
        "/public/img/searchBG/img14.jpg"
    ];
    // 背景元素插入
    url.forEach(src => {
        $(".lunbo").append($(`<div class="lunboItem" style="background-image: url(${src})"></div>`)).css({width: url.length * 100 + "%"});
        $(".lunboItem").css({width: $(".lunboView").width()});
    });
    // 背景切换
    let indexHeader = 0;    // 记录 lunbo 的 left 值
    let timer = setInterval(headerBG, 5);   // 无限定时器（滑动定时器）
    let timerOut;           // 一次性定时器（暂停等待定时器）
    function headerBG(){ 
        $(".lunbo").css({left: -indexHeader +"%"});
        if(!(indexHeader % 100)){
            // console.log(indexHeader);
            window.clearInterval(timer);    // 清除无限定时器（滑动状态）
            timer = null;       // 暂停中 timer = null
            timerOut = setTimeout(() => { 
                timer = setInterval(headerBG, 5);
                window.clearTimeout(timerOut);
            }, 3500);    // 暂停 3500ms 再执行无限定时器
        }
        indexHeader ++;
        indexHeader >= url.length * 100 ? indexHeader = 0 : 0;
    }
    // 背景切换按钮
    // ringht " 〉"
    $(".btnRight").click(function(){ 
        if(!timer){  // 在暂停中
            window.clearTimeout(timerOut);
            timer = setInterval(headerBG, 5);
        }
    });
    // left "〈 "
    $(".btnLeft").click(function(){
        if(!timer){     // 暂停中 timer = null
            indexHeader --;
            window.clearTimeout(timerOut);  // 清除暂停等待的定时器
            const tmp = indexHeader - 100;  // 回滑的 left 值
            timer = setInterval(() => {     // 回滑定时器
                $(".lunbo").css({left: -indexHeader +"%"});
                if(indexHeader <= tmp){
                    window.clearInterval(timer);        // 清除回滑定时器
                    timer = setInterval(headerBG, 5);   // 启动normal状态下滑动定时器
                } else {
                    indexHeader --;
                    if(indexHeader <= -100) {
                        window.clearInterval(timer);
                        indexHeader = url.length * 100 - 100;
                        timer = setInterval(headerBG, 5);
                    }  
                }
            }, 5); 
        } 
        // else {       // 滑动中 timer = null   
        //     window.clearInterval(timer);    // 在滑动中清除 timer = setInterval() 
        //     const tmp = parseInt(indexHeader / 100);    // 滑动中回滑的left值
        //     console.log(indexHeader,tmp * 100);         
        //     timer = setInterval(() => {       // 回滑定时器
        //         $(".lunbo").css({left: -indexHeader +"%"}); 
        //         if(indexHeader <= tmp * 100){
        //             window.clearInterval(timer);    // 清除回滑定时器
        //             timer = setInterval(headerBG, 5);
        //         }
        //         indexHeader --;
        //     }, 5); 
        // } 
    });
});


/******************** Model Base 数据显示模块 ********************/
$(function() {
    // model选项
    let modleTXT = ["电商","商业","旅游","博客","城市","美学","自然"];
    modleTXT.forEach(ele => $("#modleTXT").append($(`<span>${ele}</span>`)));
    // 初始数据
    getModel("电商",6,1);
    $("#modleTXT").find("span").eq(0).css({color:"#ff510f"});
    // 点击model选项选择数据
    $("#modleTXT").delegate("span","click",function(){
        $("#modleTXT").find("span").css({color:"#1a1a1a"});
        $(this).css({color:"#ff510f"});
        $("#model").html("");
        getModel($(this).html(),6,1);
    });
    let indexMore = 0;
    $(".modelMore").eq(0).delegate("#more","click",function(){
        indexMore ++;
        getModel("网站",6,indexMore);
    });

    // 请求方法
    function getModel(keys, pageAmount, page) {
        $.ajax({
            type: "GET",
            url: "/model",
            data:{
                "keys":keys,
                "pageAmount":pageAmount,
                "page":page
            },
            success: function (data) {
                console.log(data);
                if (data == 0) {
                    $("#model").append($(`<div class="messageDage">暂无模板数据</div>`));
                    $(".modelMore").eq(0).html("");
                } else {
                    $.each(data, (index, value) => {
                        let $ele = creratEle(value);
                        $ele.get(0).id = value._id;
                        $ele.get(0).title = value.title;
                        $("#model").append($ele);
                    });
                    $(".modelMore").eq(0).html(`<div class="glyphicon glyphicon-align-center" id="more"> MORE</div>`);
                }
            }   
        })
    }
    function creratEle(option){
        return $(`<div class="col-sm-6 col-md-4">
            <div class="modelPho">
                <div class="modelSrc"><img src="${option.src}" alt="${option.keys}"></img></div>
                <p class="modelP">${option.title}</p>
                <p class="modelP">用户评分：<span class="modelS">★★★★★</span></p>
                <div class="maskDiv"><div class="glyphicon glyphicon-search"></div></div>
            </div>
        </div>`);
    }
    // 大图查看
    $("#model").delegate(".modelPho", "click", function(){
        let maskImg = $(this).find(".modelSrc").find("img");
        localStorage.maskTitle = $(this).parent().get(0).title;
        localStorage.maskID = $(this).parent().get(0).id;
        localStorage.maskSrc = maskImg[0].src;
        $("#mask").append($(`<img src="${maskImg[0].src}" id="maskImg"></img><div class="maskBottom">
            <div src="#" class="maskleft">查看详情</div><div class="maskright glyphicon glyphicon-remove"></div>
        </div>`)).fadeIn();
    });
    // 大图隐藏
    $("#mask").delegate(".maskright", "click", () => $("#mask").html("").fadeOut());
    // mask 详情页
    $("#mask").delegate(".maskleft", "click", () => {
        $("#mask").html("").fadeOut(0);
        window.open("/mask", "_blank");
    });
});


/******************** view 数据显示模块 ********************/
$(function() {
    $.ajax({
        type:"GET",
        url: "/case",
        success: data => data.forEach((ele, index) => $("#viewUI").append(creratView(index,ele)))
    })

    function creratView(index,option){
        let offset = "";
        index % 2 != 0 ? offset = ["col-md-push-5","col-md-pull-5"] : offset
        return $(`<div class="row viewRow">
            <div class="viewLeft viewLeft_${index} col-md-5 col-md-offset-1 ${offset[0]}"></div>
            <div class="viewRight col-md-5 ${offset[1]}">
                <h4>${option.title}</h4>
                <p>${option.txt[0]}</p><p>${option.txt[1]}</p>
                <p>${option.txt[2]}</p><p>${option.txt[3]}</p>
            </div>
        </div>`)
    }
});


/******************** 监听滚轴触发 animation ********************/
$(function() {
    // 滚轴触发动画
    $(window).scroll(() => {
        // model 动画
        if($(".model").eq(0).offset().top + 100 <= $(window).height() + $(window).scrollTop()){
            // $(".model").eq(0).addClass("animated slideInUp").css({visibility: "visible"});
            $(".model").eq(0).css({animation: "modelRun 1s ease-out forwards"});   
        }   
        for(let i = 0; i < $(".advUI").length; i++){
            if($(".advUI").eq(i).offset().top + 280 <= $(window).height() + $(window).scrollTop()){
                $(".advUI").eq(i).addClass("animated slideInRight").css({visibility: "visible"});
            }
        }
        // view 动画
        for(let i = 0; i < $(".viewRow").length; i++){
            if($(".viewRow").eq(i).offset().top + 280 <= $(window).height() + $(window).scrollTop()){
                $(".viewLeft").eq(i).addClass("animated bounceInLeft");
                $(".viewRight").eq(i).addClass("animated bounceInRight");
                $(".viewRow").eq(i).css({visibility: "visible"});   // 初始隐藏 监听显示
            }
        }
    });
    
    // $(window).height();                            // window.innerHeight
    // $(window).scrollTop();                         // window.pageYOffset
    // $(".model").eq(0).offset().top;                //  window.offsetTop
    // $(window).height() + $(window).scrollTop();    // 文档高度 + 滚动距离
});


