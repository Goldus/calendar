window.onload = function() {

	const nameOfTheDay = ['Понедельник', 'Вторник', 'Среда','Четверг','Пятница','Суббота','Воскресенье'];
	const nameOfTheMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
	'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', ];
		let today = new Date();
		let cur_month = today.getMonth();
		let cur_year = today.getFullYear();

	function getDateAgo(date, days){ 
		let dateCopy = new Date(date);
		dateCopy.setDate(date.getDate()-days);
		return dateCopy.getDate();
	}

	function displayCurrentMonth(){
		const newData = new Date();
		let nowYear = newData.getFullYear();
		let nowMonth = newData.getMonth();
		let currentDate = newData.getDate();

		today = newData;
		cur_month = nowMonth;
		cur_year = nowYear;

		const table = document.querySelector('.calendar-main');
		if (table) {
			table.remove();
		}
		createTable(nowYear, nowMonth);
		hightlight(currentDate);
	}

	function hightlight(currentDate) {
		let currentDay = currentDate;
		let days = document.getElementsByClassName('number-day');
		if (currentDay < 7) {
			for (let i =0; i < 13 ; i++) {
				if (days[i].innerText == currentDay ){
				days[i].parentNode.parentNode.style.backgroundColor = '#f4f4f4';
				}
			}
		} else {
			for (let i =6; i < days.length ; i++) {
				if (days[i].innerText == currentDay ){
				console.log(days[i])
				days[i].parentNode.parentNode.style.backgroundColor = '#f4f4f4';
				}
			}
		}
	}

	function displayPreviosMonth(){

		let table = document.querySelector('.calendar-main');
		table.remove();
			
		if (cur_month > 0) {
			cur_month = cur_month-1;
		} else {
			cur_month = 11;
		}
		
		if (cur_month > 0) {
			cur_year = cur_year;
		} else {
			cur_year--;
		}

		createTable(cur_year, cur_month);
	}

	function displayNextMonth(){

		let table = document.querySelector('.calendar-main');
		table.remove();
			
		if (cur_month < 11) {
			cur_month = cur_month+1;
		} else {
			cur_month = 0;
		}

		if (cur_month < 11) {
			cur_year = cur_year;
		} else {
			cur_year++;
		}

		createTable(cur_year, cur_month);
	}

	function createTable(year, month) {
		let currentYear = year;
		let currentMonth = month;

		let monthBlock = document.querySelector('.month');
		let showMonth = nameOfTheMonth[currentMonth] + ' ' + currentYear;
		let showYear = currentYear;
		monthBlock.innerText = nameOfTheMonth[currentMonth] + ' ' + currentYear;

		const table = document.createElement('div');
		table.className = 'calendar-main';
		document.querySelector('.calendar-body').appendChild(table);

		let firstDay = new Date(currentYear,currentMonth, 1)
		let numberInWeek = firstDay.getDay() -1;
		if (numberInWeek < 0) {
			numberInWeek = 6;
		}
		let a = 0;
		while (firstDay.getMonth() == currentMonth ) {
			const calendarRow = document.createElement('div');
			calendarRow.className = 'calendar-row';
			let i = 0;
			while (i < 7) {
				if (a == 0) {
					if (i < numberInWeek ) {
						const calendarItem = document.createElement('div');
						calendarItem.className = 'calendar-item';
						const calendarDay = document.createElement('div');
						calendarDay.className = 'day';
						const span = document.createElement('span');
						span.innerText = nameOfTheDay[i] + ', ';
						const numberDay = document.createElement('span');
						numberDay.className = 'number-day';
						let j = numberInWeek - i;
						numberDay.innerText = getDateAgo(firstDay, j);
						calendarDay.appendChild(span);
						calendarDay.appendChild(numberDay);
						calendarItem.appendChild(calendarDay);
						calendarRow.appendChild(calendarItem);
						i++;
					}else {
						const calendarItem = document.createElement('div');
						calendarItem.className = 'calendar-item';
						const calendarDay = document.createElement('div');
						calendarDay.className = 'day';
						const span = document.createElement('span');
						span.innerText = nameOfTheDay[i] + ', ';
						const numberDay = document.createElement('span');
						numberDay.className = 'number-day';
						numberDay.innerText = firstDay.getDate();
						calendarDay.appendChild(span);
						calendarDay.appendChild(numberDay);
						calendarItem.appendChild(calendarDay);
						firstDay.setDate(firstDay.getDate()+1);
						calendarRow.appendChild(calendarItem);
						i++;
					}	
				} else {
					const calendarItem = document.createElement('div');
					calendarItem.className = 'calendar-item';
					const calendarDay = document.createElement('div');
					calendarDay.className = 'day';
					const numberDay = document.createElement('span');
					numberDay.className = 'number-day';
					numberDay.innerText = firstDay.getDate();
					calendarDay.appendChild(numberDay);
					calendarItem.appendChild(calendarDay);
					firstDay.setDate(firstDay.getDate()+1);
					calendarRow.appendChild(calendarItem);
					i++;
				}
				
			}
			table.appendChild(calendarRow);
			a++;
		}
	}


	const arrowRight = document.getElementById('arrowRight');
	const arrowLeft = document.getElementById('arrowLeft');
	const toDay = document.getElementById('toDay');

	arrowRight.addEventListener('click', displayNextMonth);
	arrowLeft.addEventListener('click', displayPreviosMonth);
	toDay.addEventListener('click', displayCurrentMonth);

	displayCurrentMonth();

}
