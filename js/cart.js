/**
 * Created by Administrator on 2017/5/14.
 */

deleteProduct();
move();
function deleteProduct(){
//获取标签
    var checked = document.querySelectorAll('.cart-checked');
    var rubbish = document.querySelectorAll('.product-down-right');
    //console.log(rubbish);
    var panel = document.querySelector('.panel');
    var panelContent = document.querySelector('.panel-content');
    var cancel = document.querySelector('.cancel');
    var up;
    //设置点击切换
    for(var i=0;i<checked.length;i++){
        jd.tap(checked[i],function(e){
            var a = e.target;
            if(a.hasAttribute('check')){
                a.removeAttribute('check');
            }else{
                a.setAttribute('check','');
            }
        });
    }

    //点击垃圾筒，出现蒙版
    for(var j=0;j<rubbish.length;j++){
        (function(index){
            jd.tap(rubbish[index],function(){
                //出现蒙版和动画
                panel.style.display = 'block';
                panelContent.className = 'panel-content jump';

                //垃圾桶盖 打开45度
                up = rubbish[index].firstElementChild;
                //旋转
                up.style.transform = 'rotate(-45deg)';
                up.style.webkitTransform = 'rotate(-45deg)';

                //修改定位点
                up.style.transformOrigin = '0 3px';
                up.style.webkitTransformOrigin = '0 3px';
            })
        })(j)
    }

    //点击取消按钮面板消失
    jd.tap(cancel,function(){
        panel.style.display = 'none';
        //垃圾桶归位
        up.style.transform = 'none';
        up.style.webkitTransform = 'none';
    })
}
