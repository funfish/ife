function freDay(year) {
	return (year % 4) == 0 && (year % 100) ==0 || (year % 400) ==0 ? 29 : 28
}

function mouthDay(mouth) {
	return mouth == 4 || mouth == 6 || mouth == 9 || mouth == 11 ? 30 : 31
}

window.onload = function() {
	$$.$('#show').onclick = function() {
		var inputDate = $$.$('input').value.trim().split(/-/g);
		var tar = new Date(inputDate[0], inputDate[1]-1, inputDate[2]);
		var now = new Date();

		if (inputDate.length != 3) return $$.$('#time').innerHTML = '请按照XXXX-XX-X格式输入年月日'
		if (now >=tar) return $$.$('#time').innerHTML ='请输入一个大于现在的时间'
		var start = setInterval(function(){
			now = new Date();
			if (now >= tar) {
				clearInterval(start);
				return alert('时间是一样的啦！！')
			}

			var nowYear = now.getFullYear(),
				nowMouth = now.getMonth() + 1,
				nowDay = now.getDate(),
				nowHour = now.getHours(),
				nowMinutes = now.getMinutes(),
				nowSeconds = now.getSeconds();
			var tarYear = tar.getFullYear(),
				tarMouth = tar.getMonth() + 1,
				tarDay = tar.getDate(),
				tarHour = tar.getHours(),
				tarMinutes = tar.getMinutes(),
				tarSeconds = tar.getSeconds();
			var diff = [];//时间差

			if (tarSeconds >= nowSeconds) {
				diff[0] = tarSeconds -  nowSeconds;
			}else {
				diff[0] = tarSeconds + 60 -nowSeconds;
				tarMinutes = tarMinutes - 1; 
			}

			if (tarMinutes >= nowMinutes) {
				diff[1] = tarMinutes - nowMinutes;
			}else {
				diff[1] = tarMinutes + 60 - nowMinutes;
				tarHour = tarHour - 1;
			}

			if (tarHour >= nowHour) {
				diff[2] = tarHour - nowHour; 
			}else {
				diff[2] = tarHour + 24 -nowHour;
				tarDay = tarDay - 1; 
			}

			if (tarDay >= nowDay) {
				diff[3] = tarDay - nowDay;
			}else {
				if(tarMouth != 3) {
					diff[3] = tarDay + mouthDay(tarMouth-1) -nowDay;
				}else {
					diff[3] = tarDay + freDay(tarYear) -nowDay;
				}
				tarMouth = tarMouth - 1;
			}

			if (tarMouth >= nowMouth) {
				diff[4] = tarMouth - nowMouth;
			}else {
				diff[4] = tarMouth +12 - nowMouth;
				tarYear = tarYear -1;
			}

			diff[5] = tarYear - nowYear;

			$$.$('#time').innerHTML = '距离' + inputDate[0] + '年' + inputDate[1] + '月' + inputDate[2] + '日还有' 
									+ diff[5] + '年' + diff[4] + '月' + diff[3] + '日' + diff[2] + '小时' + diff[1] + '分' + diff[0] + '秒';
		},998)
	}
}