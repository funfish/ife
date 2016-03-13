window.onload = function(){
	function toggleimg(){};
	toggleimg.prototype = {
		count: 0,//图片总数量
		imgurl: [],//图片链接
		imgpositon: [],
		index: 0,
		move:null,
		boxul:null,
		imgList:null,
		numList:null,
		int: function(){
			box = document.getElementById("box");
			for(var i = 0; i < 2; i++){
				var ul = document.createElement("ul");
				for(var j = 1; j <= this.count; j++){
					var li = document.createElement('li');
					li.innerHTML = i == 0 ? this.imgurl[j-1] : j;
					if(i == 0){
						li.style.left = 520*(j-1) + "px";
						this.imgpositon[j-1] = li.style.left;
					}
					ul.appendChild(li);
				}
				box.appendChild(ul);
			}
			this.boxul = box.getElementsByTagName("ul");
			this.boxul[0].className = "imgList";
			this.boxul[1].className = 'countNum';
			this.boxul[1].getElementsByTagName('li')[0].className = "current";
		},	
		show: function(dir,index){
			this.imgList = this.boxul[0].getElementsByTagName("li");
			var countNum = this.boxul[1].getElementsByTagName('li');
			for(var i = 0; i<5; i++){
				this.imgList[i].style.left = parseInt(this.imgpositon[i]) -520*index*dir+"px";
				if(parseInt(this.imgList[i].style.left)<-1050) this.imgList[i].style.left = 1040+"px";
				if(parseInt(this.imgList[i].style.left)>1050) this.imgList[i].style.left = -1040+"px";
				countNum[i].className = "";
			}
			countNum[index].className = "current";
		},
		autoplay: function(){
			that = this;
			this.move = setInterval(function(){
				that.index++;
				if(that.index>= 5) that.index = 0;
				that.show(1,that.index);
			},1000);
		},
		mouse: function(){
			var that = this;
			this.numList = this.boxul[1].getElementsByTagName("li");
			this.boxul[0].onmouseover = function(){ clearInterval(that.move);}
			this.boxul[0].onmouseout = function(){that.autoplay();}
			for(var i=0; i<that.count; i++){
				that.numList[i].index = i;
				that.numList[i].onmouseover = function(){
					clearInterval(that.move);
					that.show(1,this.index);
					that.index = this.index;
				}
			}
		}
	}
	var toggle = new toggleimg();
	toggle.imgurl = ["<img src = \"img/1.jpg\">","<img src =\"img/2.jpg\">",
	"<img src = \"img/3.jpg\">","<img src = \"img/4.jpg\">","<img src = \"img/5.jpg\">"]
	toggle.count = 5;
	toggle.int();
	toggle.autoplay();
	toggle.mouse();

}