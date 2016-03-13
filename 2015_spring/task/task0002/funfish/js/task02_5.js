window.onload = function(){
	function getMousePo(event){
		var e = event||window.event;
		var ScrollX = document.body.scrollLeft||document.documentElement.scrollLeft;
		var ScrollY = document.body.scrollTop||document.documentElement.scrollTop;
		var point = {
			x:0,
			y:0
		};
		point.x = e.pageX||e.clientX + ScrollX;
		point.y = e.pagey||e.clientY + ScrollY;
		return point;
	};
	var getCss = function(o, key){return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];}


	 	function drag(o){
		var origin,selection;
		var position = {
			dragFlag: false,
			Index: null,
		}
		$$.delegate($$.$('#container1'),'div','mousedown', function( ev){
			var target = ev.target || ev.srcElement;
			selection = target;
			//防止选中文字
			console.log(target);
			target.onselectstart = function(){
				return false;
			} 
			position.dragFlag = true;
			console.log(position.dragFlag);
			var po = getMousePo(ev);
			origin = po;
			//记录鼠标想对盒子左上角的坐标偏差
			position.xSpace = po.x - parseInt(getCss(target, 'left'));
			position.ySpace = po.y - parseInt(getCss(target, 'top'));
			Index = getCss(target,'z-index');
			target.style.cursor = 'move';
			target.style.zIndex = 9999;//保持移动的时候没有被其他元素挡着
	  	});
	  	document.onmousemove = function(ev){
	  		if(position.dragFlag){
	  			var po = getMousePo(ev);
	  			selection.style.left = po.x - position.xSpace + 'px';
	  			selection.style.top = po.y - position.ySpace + 'px';
	  		}
	  	}
	  	document.onmouseup = function(ev){
	  		if(position.dragFlag){
		  		var target = ev.target || ev.srcElement;
		  		var parentN = target.parentNode;
		  		var po = getMousePo(ev);

		  		if(collision(target, ev)) {
					target.style.top = origin.y - position.ySpace + 'px';					  			
		  		}else if(isInside(target, ev)) {
					brother = parentN.nextSibling.nextElementSibling || parentN.previousSibling.previousElementSibling;
					parentN.removeChild(target);
					brother.appendChild(target);	
		  		}else {
		  			target.style.top = origin.y - position.ySpace + 'px';  			
		  		}
		  		target.style.left = origin.x - position.xSpace + 'px';  			
		  		position.dragFlag = false;
		  		target.style.cursor = 'auto';
		  		target.style.zIndex = Index;
	  		}
		}

		function isInside(o ,ev) {
			var childPo = getMousePo(ev), 
				parent = o.parentNode,
				insideFlag = false,
				parentPo = {}, brotherPo = {};

			childPo.x = childPo.x - position.xSpace;
			childPo.y = childPo.y - position.ySpace;
				
			parentPo.x = parseInt(getCss(parent,'left'));
			parentPo.y = parseInt(getCss(parent,'top'));
			brother = parent.nextSibling.nextElementSibling || parent.previousSibling.previousElementSibling;
			brotherPo.x = parseInt(getCss(brother,'left'));
			brotherPo.y = parseInt(getCss(brother,'top'));

			console.log(brotherPo,childPo);
			if(parent.nextSibling.nextElementSibling) {
				if (childPo.x > brotherPo.x + 130 && childPo.x < brotherPo.x + 280 && 
					childPo.y > brotherPo.y - 40 && childPo.y < brotherPo.y + 580) {
					insideFlag = true;
					console.log(1);
				}else {
					insideFlag = false;
					console.log(2);
				}
			}else {
				if (childPo.x + 470 > brotherPo.x && childPo.x + 430< brotherPo.x && 
					childPo.y > brotherPo.y - 40 && childPo.y < brotherPo.y + 580) {
					insideFlag = true;
					console.log(1);
				}else {
					insideFlag = false;
					console.log(2);
				}				
			}
			return insideFlag;
		}

		function collision(o, ev) {
			var childPo = getMousePo(ev), 
				parent = o.parentNode,
				collisionFlag = false;	
			var brother = parent.nextSibling.nextElementSibling || parent.previousSibling.previousElementSibling;
			$$.each(brother.childNodes, function(item){
				console.log(o.offsetTop,item.offsetTop);
				if (typeof item.offsetTop =='number'){
					console.log(111);
					if ( o.offsetTop > item.offsetTop - 60 && o.offsetTop < item.offsetTop + 60){
						collisionFlag = true;
					}else {
						collisionFlag = false;						
					}
				}
			})	
			console.log(collisionFlag);
			return collisionFlag
		}

	}
	var o = document.getElementById("drag");
	var oo = document.getElementById("drag2");

	drag(o);
//	drag(oo);
	console.log($$.$('#container1').childNodes)

}