module.exports = {
	getTimeList: function(timeConfig, currentDateObj) {
		/**
		* should check if it is valid timeConfig
		**/
		if (typeof timeConfig !=='object' || !timeConfig.start || !timeConfig.close || timeConfig.start < 0 || timeConfig.close > 24) {
			throw "invalid timeConfig";
		}

		let nowHour = currentDateObj.getHours(),
			mins = currentDateObj.getMinutes(),
		 	startHour = nowHour + 1,
		 	startMins = this.getClosetNextMin(mins),
		 	isNextDay = startHour > timeConfig.close,
		 	dateMap = {
		 		0: 'Sunday',
		 		1: 'Monday',
		 		2: 'Tuesday',
		 		3: 'Wednesday',
		 		4: 'Thursday',
		 		5: 'Friday',
		 		6: 'Saterday',
		 	},
		 	timeArr = [];

		 	if (startHour < timeConfig.start + 1) {
		 		startHour = timeConfig.start + 1;
		 	}

		 	if (!isNextDay) {
		 		for(let i = startHour; i < timeConfig.close; i ++) {
		 			
		 			for(let j = (i === startHour ? startMins : 0); j < 60; j+=5) {
		 				let obj = {
		 					description: dateMap[currentDateObj.getDay()] + ", " + this.formatHourMin(i, j),
		 					value: this.formateDateObj(new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate(), i, j, 0))
		 				};

		 				timeArr.push(obj);
		 			}
		 		}	
		 	}	

	 		let nextDay = currentDateObj.getDay() + 1;

	 		if (nextDay === 7) {
	 			nextDay = 0;
	 		}

	 		for(let i = timeConfig.start + 1; i < timeConfig.close; i++) {
	 			for(let j = 0; j < 60; j+= 5) {
	 				let obj = {
	 					description: dateMap[nextDay] + " " + this.formatHourMin(i, j),
	 					value: this.formateDateObj(new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate() + 1, i, j, 0))
	 				};

	 				timeArr.push(obj);
	 			}
	 		}

		 	return timeArr;
	},

	formatHourMin: function(hour, min) {
		return this.forceTwoDigit(hour) + ":" + this.forceTwoDigit(min);
	},

	forceTwoDigit: function(digit) {
		if (digit < 10) {
			return '0' + digit;
		}

		return digit.toString();
	},

	formateDateObj: function(dateObj) {
		return dateObj.getFullYear() 
			+ "-" + this.forceTwoDigit(dateObj.getMonth() + 1) 
			+ "-" + this.forceTwoDigit(dateObj.getDate()) 
			+ " " + this.forceTwoDigit(dateObj.getHours())
			+ ":" + this.forceTwoDigit(dateObj.getMinutes()) 
			+ ":" + this.forceTwoDigit(dateObj.getSeconds()); 
	},

	getClosetNextMin: function(minute) {
		let moduloNumber = minute % 5,
			rest = moduloNumber === 0 ? 0 : 5 - moduloNumber,
			nextMinute = minute + rest;

		if (nextMinute >= 60) {
			return nextMinute - 60;
		}

		return nextMinute;
	},

	isValidDateFormat: function(dateStr) {
		/**
		* should check if dateStr is on right fromat
		**/
		let reg = /^\d{4}\-\d{2}\-\d{2}\s\d{2}:\d{2}:\d{2}$/;
		return reg.test(dateStr);
	},
	
	getTimeStampFromDateStr: function(dateStr) {
		if (!this.isValidDateFormat(dateStr)) {
			throw 'it is not valid dateStr format!';
		}

		/**
		* get year, month, day, hour, minutes, seconds from the dateStr
		**/
		let dateTimeArr = dateStr.split(" "),
			dateArr = dateTimeArr[0].split("-"),
			timeArr = dateTimeArr[1].split(":");

		let dateObj = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]), parseInt(timeArr[2]));

		return +dateObj/1000;
	}
};
