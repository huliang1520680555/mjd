/**
 * Created by Administrator on 2017/5/10.
 */
//改变导航条的颜色
window.onload = function(){
    //改变导航条的颜色
    changeNavColor();
    //轮播图
    RoundBanner();

    //秒杀
    secondKill();
};
//自动切换改变窗口的大小
window.onresize = function(){
    window.location.reload();
};




//导航条改变颜色的函数
function changeNavColor(){
    //获取标签
    var header = document.querySelector('.jd-header-box');
    var banner = document.querySelector('.jd-banner');
    //console.log(banner);
    //获取轮播图的高度
    var bannerH = banner.offsetHeight;
    //console.log(bannerH);
   window.onscroll = function(){
       //获取滚动的高度
       var  scrollT = document.body.scrollTop;
       //console.log(scrollT);
       //设置比例
       var opc = scrollT /bannerH * 0.8;
       //console.log(ratio);
       //为了让背景颜色的透明度最大不能超过0.8需要作出判断
       if(opc>=0.8){
           opc=0.8;
       }
       //改变背景颜色
       header.style.background = 'rgba(201,21,35,'+opc+')'
   };
}

//轮播图
function RoundBanner(){
    //获取标签
    var banner = document.querySelector('.jd-banner');
    var oul = banner.children[0];
    var ol = banner.children[1];
    var lis = ol.children;
    console.log(lis);

    //默认的索引
    var index =1;
    //获取轮播图的宽度
    var bannerW = banner.offsetWidth;


    //位移
    function translateX(x){
        oul.style.transform = 'translateX('+ x +'px)';
        oul.style.webkitTransform ='translateX('+ x +'px)'
    }
    //添加过渡
    function addTransition(){
        oul.style.transition = 'all 0.5s ease';
        oul.style.webkitTransition = 'all 0.5s ease';
    }
    //删除过渡
    function removeTransition(){
        oul.style.transition = 'none';
        oul.style.webkitTransition = 'none';
    }
    //添加定时器
    var timer = setInterval(round,1000);
    function round(){
        index++;
        var distance = -index *bannerW;
        //添加动画
        addTransition();
        //位移
        translateX(distance)
    }

//过渡动画结束触发
/*    oul.addEventListener('transitionend',function(){
        //判断临界值
        if(index>=9){
            index = 1;
        }else if(index<=0){
            index = 8;
        }
        //移除过渡动画
        removeTransition();
        //改变位置
        translateX(-index * bannerW);
        //指示器
        setPoint();
    });
    oul.addEventListener('webkitTransitionEnd',function(){
        //判断
        if(index>=9){
            index = 1;
        }else if(index<=0){
            index = 8;
        }
        //移除过渡动画
        removeTransition();
        //改变位置
        translateX(-index * bannerW);
        //指示器
        setPoint();
    });*/
    jd.transitionEnd(oul,function(){
        if(index>=9){
            index = 1;
        }else if(index<=0){
            index = 8;
        }
        //移除过渡动画
        removeTransition();
        //改变位置
        translateX(-index * bannerW);
        //指示器
        setPoint();
    });
    function setPoint(){
        for(var i=0;i<lis.length;i++){
            //首先清空current
            lis[i].className = '';
        }
        //根据相应的索引添加current
        lis[index-1].className = 'current';
    }

    //添加手势
    var startX = 0;
    var endX = 0;
    var distanceX =0;
    oul.addEventListener('touchstart',function(e){
        //console.log('开始触摸');
        //由于当开始触摸的时候停止轮播
        clearInterval(timer);
        startX = e.touches[0].clientX;
        //console.log(startX);
    });
    oul.addEventListener('touchmove',function(e){
        //console.log('开始移动');
        //阻止默认事件
        e.preventDefault();
        endX = e.touches[0].clientX;
        //console.log(endX);
        distanceX = endX - startX;
        console.log(distanceX);
        //删除动画
        removeTransition();
        //移动
        translateX(-index *bannerW + distanceX);
    });
    oul.addEventListener('touchend',function(){
        //console.log('结束触摸');
        //当结束触摸的时候开始轮播
        timer = setInterval(round,1000);
    //    判断当手指拖动一定的距离后是该跳转到下一张、上一张还是当前一张；
        //比如规定拖动的距离小于整个页面的1/3时回到当前一张，如大于1/3时应跳转到下一张或者是上一张
        if(Math.abs(distanceX )>= bannerW /3){
            if(distanceX>0){
                index--;
            }else{
                index++;
            }
        }
        //添加过渡
        addTransition();
        translateX(-index * bannerW);
    })
}

//秒杀
function secondKill(){
//获取标签
    var spans = document.querySelector('.jd-product-time').children;
    //设置开始倒计时的时间
    var time = 9 * 60 * 60;
    //由于秒杀的时间是自动递减的，所以设置定时器；
    var timer = setInterval(function(){
       //clearInterval(timer);
        time--;
        //获取时、分、秒
        var h = parseInt(time / (60 * 60));
        var m = parseInt( time % (60 *60)/ 60);
        var s = time % 60;
        //当倒计时结束时清空定时器
        if(time<=0){
            clearInterval(timer);
        }
        //更改内容
        spans[0].innerHTML = h >= 10 ? parseInt(h/10): 0;
        spans[1].innerHTML = String(h % 10);

        spans[3].innerHTML = m >= 10 ? parseInt(m/10) : 0;
        spans[4].innerHTML = String(m % 10);

        spans[6].innerHTML = s >= 10 ? parseInt(s/10) : 0;
        spans[7].innerHTML = String(s % 10);
    },1000);

}