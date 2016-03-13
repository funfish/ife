window.onload = function() {
	var textArr,length;
	$$.$('#input').oninput = function() {
		textArr = $$.$('textarea').value.trim().split(/[\，\；\：\,\;\:\s]/g);
		length = textArr.length;
		if (length == 0) {
			$$.$('#alarm').innerHTML = 'Input,please';
		}else if(length < 10 && length > 0) {
			$$.$('#alarm').innerHTML = '';
		}else {
			$$.$('#alarm').innerHTML = 'not more then 10 items';
			alert('input item should less then 10');
		}		
	}
	$$.$('#show').onclick = function(){
		if(length == 0) {
			$$.$('#alarm').innerHTML = 'Input,please';
			alert('input,please');
		}else if (length < 10 && length > 0) {
			for (var i = 0; i < length; i++) {
				var checkbox = '<input type="checkbox">'+ textArr[i];
				var li = document.createElement('li');
				li.innerHTML = checkbox;
				$$.$('#intrestList').appendChild(li);
			}
		}else {
			alert('not more then 10 items');
		}
	}
}