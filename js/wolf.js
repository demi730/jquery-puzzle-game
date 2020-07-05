$(function(){
    //监听游戏规则的点击
    $(".rule").click(function(){
        $(".rules").stop().fadeIn(100);
    });
    //监听关闭游戏规则的点击
    $(".rules>a").click(function(){
        $(".rules").stop().fadeOut(100);
    });
    //监听开始按钮的点击
    $(".container>button").click(function(){
        $(this).hide();
        //时间进度条开始变化
        timeProgress();
        //灰太狼开始出现
        wolfAnimation();
        //监听重新开始按钮的点击
        $(".over>button").click(function(){
            //重新开始时分数清零
            $(".score").text("0");
            $(".over").stop().fadeOut(100);
            timeProgress();
            wolfAnimation();
        });

    });
    var wolfTime;
    //定义一个函数来实现灰太狼的动画
    function  wolfAnimation(){
        //定义三个数组，分别表示灰太狼、小灰灰、坑的所有图片或位置
        var wolf1 = ["./img/h0.png","./img/h1.png","./img/h2.png","./img/h3.png","./img/h4.png","./img/h5.png",
            "./img/h6.png","./img/h7.png","./img/h8.png","./img/h9.png"];
        var wolf2 = ["./img/x0.png","./img/x1.png","./img/x2.png","./img/x3.png","./img/x4.png","./img/x5.png",
            "./img/x6.png","./img/x7.png","./img/x8.png","./img/x9.png"];
        var positionImg = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //创建一张图片
        var $img = $("<img src='' class='wolfimg'>");
        //设置图片显示的位置
        var $position = Math.round(Math.random()*8);
        $img.css({
            position:"absolute",
            left:positionImg[$position].left,
            top:positionImg[$position].top
        });
        //设置图片的内容
        window.imgIndex = 0;
        window.endImgIndex = 5;
        wolfTime = setInterval(function(){
            if(imgIndex>endImgIndex){
                $img.remove();
                clearInterval(wolfTime);
                wolfAnimation();
            }
            $img.attr("src",$imgWolf[imgIndex]);
            imgIndex++;
        },150);
        //设置图片的随机显示
        var $imgWolf = Math.round(Math.random()*1)==0?wolf1:wolf2;
        //将图片添加到界面上
        $img.appendTo(".container");
        //调用处理游戏规则的方法
        gameRules($img);
    }
    //处理游戏规则的方法
    function gameRules($img){
        //给图片添加单击响应函数
        $img.one("click",function(){
            //判断图片是灰太狼还是小灰灰
            var $src = $(this).attr("src");
            var flag = $src.indexOf("h")>=0;
            if(flag){
                //+10
                $(".score").text(parseInt($(".score").text())+10);
            }else{
                //-10
                $(".score").text(parseInt($(".score").text())-10);
            }
            //显示被打后的画面
            imgIndex = 6;
            endImgIndex = 9;
        });
    }
    //时间进度条变化的函数
    function timeProgress(){
        $(".time").width("180");
        var timer = setInterval(function(){
            var timeWidth =$(".time").width()-1;
            $(".time").css({
                width:timeWidth
            });
            //当时间耗完，游戏结束
            if(timeWidth<=0){
                clearInterval(timer);
                $(".over").stop().fadeIn(100);
                //停止动画
                stopWolfAnimation();
            }
        },100);
        function  stopWolfAnimation(){
            $(".wolfimg").remove();
            clearInterval(wolfTime);
        }



    }
});