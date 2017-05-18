/**
 * Created by Administrator on 2017/5/10.
 */
/*-----------过渡动画结束触发部分函数的抽取---------------------*/
window.jd = {};
jd.transitionEnd = function(obj,callBack){
    //1.如果不是对象就直接终止
    if(typeof obj != 'object') {
        return;
    }
    obj.addEventListener('transitionend',function(){
        if(callBack){
            callBack();
        }
    });
    obj.addEventListener('webkitTransitionEnd',function(){
        if(callBack){
            callBack();
        }
    });
};

//tap点击事件
jd.tap = function(obj,callBack){
    //1.如果不是对象就直接终止
    if(typeof obj != 'object') {
        return;
    }
    //设置tap事件的规则，手指按下抬起中间没有移动，并且的话是按下和抬起之间差小于等于200ms
    var startTime = 0;
    var endTime = 0;

    //false是没有移动，true是移动
    var isMove = false;
    obj.addEventListener('touchstart',function(e){
        //获取当前的时间
        startTime = Date.now();
    });
    obj.addEventListener('touchmove',function(e){
        isMove = true;
    });
    obj.addEventListener('touchend',function(e){
        endTime = Date.now();
        var del = endTime - startTime;
        //做出判断
        if(del<=200 && isMove == false){
           if(callBack) callBack(e)
        }else{
            isMove = false;
        }

    });
};

