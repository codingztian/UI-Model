$(function() {
    let search = window.location.href.split("?")[1].split("=")[1];
    $.ajax({
        type:"get",
        url:"searchKey",
        success: function(data){
            console.log(data);
            $(".nav_searchinp").val(decodeURI(search));
            $(".searchinp").val(decodeURI(search));
            let indexSrc = Math.floor(Math.random()*data.length)
            if(data == 0){
                $("#containerData").html("<h3 class='notTXT'>未检索到您要“"+decodeURI(search)+"”相关的内容</h3>");
            } else {
                $("#containerData").addClass("containerData");
                $(".headBg").eq(0).css({backgroundImage:"url("+ data[indexSrc].src +")"});
                $.each(data, (index, value) => $("#containerData").append(creratEle(value)));
            }
        }
    })

    let creratEle = option => $(`<div class="box"><img src="${option.src}" alt="${option.title}"><h2>${option.title}</h2><p>${option.txt}</p></div>`)
});