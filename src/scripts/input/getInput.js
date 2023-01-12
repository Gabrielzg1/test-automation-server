const fs = require("fs");

module.exports = {
	getInputs: function (number, subject, task) {
		const file = fs.readFileSync(
			`./src/subjects/${subject}/${task}/input/input${number}.txt`
		);
		const teste = file.toString();

		return file.toString();
	},
	getOutputs: function (number, subject, task) {
		const file = fs.readFileSync(
			`./src/subjects/${subject}/${task}/out/base/output_base${number}.txt`
		);
		return file.toString();
	},
};
