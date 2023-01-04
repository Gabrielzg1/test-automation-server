const comparator = require("./comparator");

module.exports = (subject, task, id) => {
	var relatory = new Array();
	for (let i = 1; i < 11; i++) {
		var result = comparator(i, subject, task, id);
		relatory.push(result);
		console.log(`Teste ${i}: ${result}`);
	}
	return relatory;
};
