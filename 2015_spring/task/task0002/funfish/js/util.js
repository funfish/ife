(function(){	
	var root = this;
		ArrayProto = Array.prototype,
		slice            = ArrayProto.slice;
	var previousUnderscore = root.$$;

	var $$ = function(o){
	    if (o instanceof $$) return o;
	    //保证如var c = $$(1)也能和c = new $$(1)一样，创建的是对象，
	    if (!(this instanceof $$)) {console.log(this);return new $$(o)};
	    this._wrapped = o;//将对象copy到$._wrapped集合里面
	};
	//定义$$
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
        	exports = module.exports = $$;
        }
      	exports.$$ = $$;
    } else {
      	root.$$ = $$;
    };

	$$.isArray = function(o) {
		return o instanceof Array;
	}; 
	$$.isFunction = function(o) {
		return o instanceof Function;
	};

	//是否是邮箱
	$$.isEmial = function(o) {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
		return reg.test(o);
	};
	//是否是手机号码
	$$.isMobilePhone = function(o) {
	    var reg = /^1[0-9]{10}$/;
	    return reg.test(o);
	}

	//数组去重复的
	$$.uniqArray = function(arr) {
		var result = [],
			same = [],
			length = arr.length;
		for (var i = 0; i < length; i++) {
			if (!$$.findArray(same, arr[i])) {
				result.push(arr[i]);
				same.push(arr[i]);
			}
		}
		return result
	}

	//定位
	$$.findArray = function(obj, target) {
		if (!obj) return -1;
		var length = obj.length,
			i = length;
		for (; i >0; i--) if (obj[i] === target) return 1;
	}

	//trim获取字符
	function trim(str) {
		return str.replace(/^\s*|\s*&/g,'')
	}

	//each
	$$.each = function(arr, fn) {
		if (!isArrayLike(arr)) return null;
		for (var i = arr.length - 1; i >= 0; i--) {
			fn(arr[i], i);
		};
	}
	function isArrayLike(obj) {
		return typeof obj.length == 'number' && obj.length >=0
	}
	//复制
	$$.clone = function(o) {
		if(!o) return o;
		return isArrayLike() ? o.toString().slice() : $$.cloneObject(o)
	}

	//对象复制
	$$.cloneObject = function(obj, inherit) {
		var keysG = inherit ? $$.allKeys(obj) : $$.keys(obj),
			length = keysG.length,
			result = {};
		for (var i = 0; i < length; i++) {
			var key = keysG[i];
			//task2里面要求的，但是不通用所以去掉
			//if (obj[key] instanceof Function || obj[key] instanceof RegExp) continue;
			
			result[key] = obj[key];
		}
		return result;
	}

	//获取obj本身属性
	$$.keys = function(obj) {
		if (!obj) return [];
		var keys =[];
		for (var key in obj) if (obj.hasOwnProperty(key)) keys.push(key);
		return keys;
	}

	//获取obj所有属性
	$$.allKeys = function(obj) {
		if (!obj) return [];
		var allKeys =[];
		for (var key in obj)  allKeys.push(key);
		return allKeys;
	}

	/*样式的js开始啦啦啦啦
	*
	*
	*/
	$$.$ = function(selector) {
		if (!selector) {
			return false;
		}

		var arr = selector.trim().split(' '),
			length = arr.length,
			regName = /([a-zA-Z0-9-]*)\=/,
			regValue = /\=([a-zA-Z0-9-]*)/,
			doc = document,
			charF;
		for (var i = 0; i < length; i++) {
			var st = arr[i].toString();
			charF = arr[i].charAt(0);
			switch (charF) {
				case '#':
					doc = doc.getElementById(st.substr(1));
					break;
				case '.':
					doc = doc.getElementsByTagName('*');
					var net = [];
					for (var j = doc.length - 1; j >= 0; j--) {
						if (doc[j].className === st.substr(1)) {
							net.push(doc[j]);
						}
					};
					doc = i == length-1 ? net[net.length-1] : net;
					break;
				case '[':
					var net = [];
					doc = doc.getElementsByTagName('*');
					for (var j = doc.length - 1; j >= 0; j--) {
						for (var name in doc[j].attributes) {
							if (doc[j].attributes[name].name==regName.exec(st)[1]) {
								if (regValue.exec(st)[1]) {
									if (regValue.exec(st)[1] == doc[j].attributes[name].nodeValue) net.push(doc[j]);
								} else{
									net.push(doc[j]);
								}
							}
						}
					};
					doc = i == length-1 ? net[net.length-1] : net;
					break;
				default:
	                doc = document.getElementsByTagName(st)[0];			
			}
		}
		return doc
		
	}

	document.getElementsByClassName = function(cl) {
		if (document.getElementsByClassName) return document.getElementsByClassName(cl);
		var retnode = [];
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			if((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') > -1) retnode.push(elem[i]);
		}
		return retnode;
	}; 
/*
	function $jquery(selector) {
		var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
			match, elem;

		if (!selection) {
			return this;
		}
		if (typeof selector === "string") {
			if (selector[0] === "<" &&
				selector[selector.length - 1] === ">" &&
				selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];

			} else {
				match = rquickExpr.exec(selector);
			}
			if (match && match[1]) {
				if (match[1]) {

				} else {
					elem = document.getElementById(match[2]);
					return elem;
				}
			}
		}
	}
*/
	// 为element增加一个样式名为newClassName的新样式
	$$.addClass = function(element, newClassName) {
	    element.className +=''+ newClassName;
	},

	// 移除element中的样式oldClassName
	$$.removeClass = function(element, oldClassName) {
	    element.className = element.className.replace(/oldClassName/,'')
	}

	// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
	$$.isSiblingNode = function(element, siblingNode) {
	    return element.parentNode === siblingNode.parentNode
	}

	// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
	$$.getPosition = function(element) {
	    var point = {};
	    point.x = e.pageX||e.clientX;
	    point.y = e.pagey||e.clientY;
	    return point;
	};

	/*时间响应的功能
	*
	*
	*/
	//添加事件绑定和事件删除

	$$.addEvent = $$.on = function(el, event, listener) {
        if (el.addEventListner) {
            el.addEventListner(event, listener, false);
        } else if (el.attachElement) {
            el.attachel(event, listener);
        } else {
            el["on" + event] = listener;
        }
	}; 
	$$.removeEvent = $$.un = function(el, event, listener) {
        if (el.removeEventListner) {
            el.removeEventListner(event, listener, false);
        } else if (el.detachEvent) {
            el.detachEvent("on" + event, listener);
        } else {
            el["on" + event] = null;
        }
	}; 
	$$.addClickEvent = $$.click = function(el, listener) {
		$$.addEvent('el', 'click', listener);
	};
	$$.addEnterEvent = function(el, listener) {
		var event = event || window.event;
		if (event.keyCode == 13) 
		el.addEventListener('enter', listener);
	};
	$$.delegate = function(el, tag, eventName, listener) {
		$$.each(el.getElementsByTagName(tag), function(item) {
        	$$.on(item, eventName, listener);
    	});
	};
	$$.isIE = function() {
		var userAgent = navigator.userAgent.toLowerCase();
		if (window.ActiveXObject) {
			return userAgent.exec(/msie ([\d.]+)/)[1];
		}else {
			return -1
		}
	};
	$$.getCookie = function(cookieName) {
		var names = document.cookie.split(';');
		for (var i = names.length - 1; i >= 0; i--) {
			if (names[i].slice[0, cookieName.length] == cookieName) 
				return name[i].substring(cookieName.length + 1,name[i].length)
		};
		return ''
	}
	$$.setCookie = function(cookieName, cookieValue, expiredays) {
		var date = new Date();
		date.setDate(date.getDate() + expiredays)
		document.cookie = cookieName + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + date.toGMTString()) 
	};

	$$.ajax = function(url, options) {
		var dataColletion = [],
			xmlhttp, dataArr;

		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		  	xmlhttp = new XMLHttpRequest();
		}else{// code for IE6, IE5
		  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		};
		if (!options.type) options.type = get;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status > 199 && xmlhttp.status < 207) 
					options.onsuccess ? options.onsuccess(responseText, xmlhttp) : '';
				if (xmlhttp.status > 400) 
					options.onfail ? options.onfail(responseText, xmlhttp) : '';
			}
		}
		each(options.data, function(item){
			dataColletion.push('name=' + item.name +'&password=' + item.password);
		})
		xmlhttp.open(options.type, url);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(dataColletion);
	}
}.call(this))