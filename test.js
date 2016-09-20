const arr = [1, 3, 5, 7, 9, 11, 13, 15],
	total = 30,
	find = false,
	matchArr = [];

for(let i in arr) {
	let first = arr[i];

	for(j = i; j < arr.length; j++) {
		let second = arr[j];

		for(k = j; k< arr.length; k++) {
			let third  = arr[k]
			
			console.info("%d + %d + %d = %d", first, second, third, first + second +third);

			if (first + second + third === total) {
				find = true;
				break;
			};
		}

		if (find) {
			break;
		}
	}

	if (find) {
		matchArr = [first, second, third];
		break;
	}
}

if (find) {
	console.info("find matchArr:", matchArr);
}else{
	console.info("not find any matchArr", matchArr);
}






