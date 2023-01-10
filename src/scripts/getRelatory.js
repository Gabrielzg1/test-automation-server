import comparator from "./comparator";

export const getRelatory = (subject, task, id) => {
	var relatory = new Array();
	for (let i = 1; i < 11; i++) {
		var result = comparator(i, subject, task, id);
		relatory.push(result);
	}
	return relatory;
};
