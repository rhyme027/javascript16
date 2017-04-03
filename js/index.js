var mywrapper = document.getElementById('wrapper');
var mylayer = document.getElementById('layer');
var txt = document.getElementById('txtarea');
var btn_confirm = document.getElementById('confirm');

//myLayer对象，show方法接受背景包裹层和浮出层两个参数
var myLayer = {
	onscroll: (function() {
            window.onscroll = function(e) {
                var e = window.event || e;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                layer.style.top = window.innerHeight / 2 - layer.clientHeight / 2 + scrollTop + "px";
            }
        })(),
	show: function(wrapper, layer) {
            var browser_width = document.body.clientWidth; //body的宽
            var browser_height = document.body.clientHeight; //body的高
            wrapper.style.display = "block";

            wrapper.style.height = browser_height + "px";
            wrapper.style.width = browser_width + "px";
            wrapper.style.position = "absolute";
            wrapper.style.top = 0;
            wrapper.style.right = 0;
            wrapper.style.backgroundColor = "rgba(133,133,133,.5)";

            txt.style.height = "200px";
            txt.style.width = "300px";

            layer.style.position = "absolute";
            layer.style.display = "block";
            layer.style.width = "300px";

            layer.style.top = window.innerHeight / 2 - layer.clientHeight / 2 + "px";
            layer.style.left = window.innerWidth / 2 - layer.clientWidth / 2 + "px";

            //实时显示浮出层的尺寸
            (function getTxtSize() {
                layer.style.width = txt.clientWidth + 2 + "px";
                setTimeout(getTxtSize, 0)
            })();
        },
	hide: function(wrapper, layer) {
            layer.style.display = "";
            wrapper.style.display = "";
            drag = {};
        },

	
}


//myDrag函数，里面包含了拖动的对象drag，接受一个需要拖动的参数
var myDrag = function() {
        return drag = {
            o: null,
            init: function(o) {
                o.onmousedown = this.start;
            },
            start: function(e) {
                var o;
                e = drag.fixEvent(e);
                e.preventDefault && e.preventDefault();
                drag.o = o = this;
                o.x = e.clientX - drag.o.offsetLeft;
                o.y = e.clientY - drag.o.offsetTop;
                document.onmousemove = drag.move;
                document.onmouseup = drag.end;
            },
            move: function(e) {
                e = drag.fixEvent(e);
                var oLeft, oTop;
                oLeft = e.clientX - drag.o.x;
                oTop = e.clientY - drag.o.y;
                drag.o.style.left = oLeft + 'px';
                drag.o.style.top = oTop + 'px';
            },
            end: function(e) {
                e = drag.fixEvent(e);
                drag.o = document.onmousemove = document.onmouseup = null;
            },
            fixEvent: function(e) {
                if (!e) {
                    e = window.event;
                    e.target = e.srcElement;
                    e.layerX = e.offsetX;
                    e.layerY = e.offsetY;
                }
                return e;
            },
            cancelEvent: function(o) {
                o.onmousedown = null;
            }
        }
    }

    function init1() {
        var obj = document.getElementById('layer');
        myDrag();
        drag.init(obj);
        myLayer.show(wrapper, layer);
    }

    function init2() {
        var obj = document.getElementById('layer');
        myDrag();
        drag.cancelEvent(obj);
        myLayer.show(wrapper, layer);
    }

//给两个不同按钮绑定各自的函数
document.getElementById('test1').addEventListener('click',init1,false);
document.getElementById('test2').addEventListener('click',init2,false);

//给确定和取消按钮绑定对应的函数
document.getElementById("cancel").addEventListener('click',function(){
	alert('您点击了取消');
	myLayer.hide(mywrapper,mylayer);
},false);

document.getElementById('confirm').addEventListener('click',function(){
	alert('您点击了确定！');
	myLayer.hide(mywrapper,mylayer);
},false);

//给包裹层添加关闭函数
mywrapper.addEventListener('click',function(){
	myLayer.hide(mywrapper,mylayer);
},false);






























