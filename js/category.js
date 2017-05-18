/**
 * Created by Administrator on 2017/5/12.
 */
/*----点击左侧的菜单按钮，显示导航菜单------------*/
showNav();
/*--------左侧---------------*/
LeftCategory();
function LeftCategory(){
    //获取标签
    var left = document.querySelector('.jd-main-left');
    var oul = left.children[0];
    var lis = oul.children;
    var timer = null;
    //添加事件,设置初始值
    var startY = 0;
    var endY = 0;
    var distanceY = 0;

    //设置当前的UL的Y 值
    var currentY = 0;
    //
    var del = 0;
    //设定边界最大Y值
    var maxY = 0;
    //设定最小Y值(所有的li的高度 - ul的高度)
    //因为是往上移动，所以越往上移动值是越小的（负数）；
    var minY = -(oul.offsetHeight - left.offsetHeight);
    //console.log(minY);
    //设定缓冲的值
    var buffer = 200;

    //抽取函数
    function changeTransform(Y){
        oul.style.transform = 'translateY('+Y +'px)';
        oul.style.webkitTransform = 'translateY('+ Y +'px)';
    }

    function removeTransform(){
        oul.style.transform = 'none';
        oul.style.webkitTransform = 'none';
    }

    //添加过渡动画
    function addAnimation(){
        oul.style.transition = 'all 0.2s linear';
        oul.style.webkitTransition = 'all 0.2s linear';
    }
    //触摸事件
    oul.addEventListener('touchstart',function(e){
        //开始触摸,获取开始触摸的点，由于是上下，所以是Y
        startY = e.touches[0].clientY;
    });
    oul.addEventListener('touchmove',function(e){
        //触摸移动
        //禁止默认事件(比如滚动事件)
        e.preventDefault();
        //获取触摸的终点
        endY = e.touches[0].clientY;
        distanceY = startY - endY;
        del = currentY - distanceY;
        console.log(del);
        //判断能够移动的区间
        if(del<=(maxY +buffer) && del>=(minY-buffer)){
            //移除位移
            removeTransform();
            //设置移动
            changeTransform(del);
        }
    });
     oul.addEventListener('touchend',function(){
         if(del>= maxY){
             currentY = maxY;
             //添加动画，为了上下滑动的时候舒缓一点；
             addAnimation();
             changeTransform(currentY);
         }else if(del<=minY){
             addAnimation();
             currentY = minY;
             changeTransform(minY);
         }else{
             currentY = del;
         }
    });

    //设置tab切换
    jd.tap(oul,function(e){
        //清空所有
        for(var i=0;i<lis.length;i++){
            lis[i].className = '';
            lis[i].index = i;
            //console.log(lis[i]);
        }
        //设置当前
        //其中target为当前触发事件的事件源
        var li = e.target.parentNode;
        //console.log(li);
        li.className = 'current';

        //设置滚动
        //滚动的距离
        var distance = -(li.index * li.offsetHeight);
        //判断
        if(distance > minY){
            addAnimation();
            changeTransform(distance);
            currentY = distance;
        }else{
            //不会产生滚动
            changeTransform(minY);
            currentY = minY;
        }

        //模拟网络数据
        var jd_main_right = document.querySelector('.jd-main-right');
        //addAnimation();
        jd_main_right.style.transition = 'all 0.5s ease';
        jd_main_right.style.webkitTransition = 'all 0.5s ease';
        jd_main_right.style.opacity = 0;

        timer = setTimeout(function(){
           clearTimeout(timer);
            jd_main_right.style.opacity = 1;
        },200);
    })
}


function showNav(){
  //获取相应的标签
    var menu = document.querySelector('.icon-menu');
    var nav = document.querySelector('.jd-nav');
    var header = document.querySelector('.header');
    var main = document.querySelector('.jd-main');
    //设置标记记录是否已经点击过按钮
    var flag = false;
    jd.tap(menu,function(){
        if(flag == false){
            //导航条显示
          nav.style.display = 'block';
        }else{
            nav.style.display = 'none';
        }
//重新设置内容部分的顶部间距
        main.style.paddingTop = header.offsetHeight + nav.offsetHeight + 'px';
        //重置
        flag = !flag;
    })
}
