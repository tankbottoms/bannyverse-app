export const getCurrentDateForInput = (): string => {
	const today = new Date();
	const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

	return date;
};

export const getCurrentDate = (): string => {
	return new Date(new Date().setHours(0, 0, 0, 0)).toJSON();
};

export const english_ordinal_suffix = (dt: Date): string => {
	const monthArr = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const [date, year, month] = [dt.getDate(), dt.getFullYear(), dt.getMonth()];
	return (
		monthArr[month] +
		' ' +
		date +
		(date % 10 == 1 && date != 11
			? 'st'
			: date % 10 == 2 && date != 12
			? 'nd'
			: date % 10 == 3 && date != 13
			? 'rd'
			: 'th') +
		', ' +
		year
	);
};
