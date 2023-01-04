const fs = require("fs");

module.exports = {
	getInputs: function (number, subject, task) {
		const file = fs.readFileSync(
			`./src/subjects/${subject}/${task}/input/input${number}.txt`
		);
		console.log(file.toString());
		return file.toString();
	},
};
