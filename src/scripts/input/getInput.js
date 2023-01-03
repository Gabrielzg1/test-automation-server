const fs = require("fs");

module.exports = {
	getInputs: function (number, subject, task) {
		const file = fs.readFileSync(
			`./subjects/subject1/lab1/input/input${number}.txt`
		);
		return file.toString();
	},
	writeInputs: function (number, subject, task) {
		for (let i = 0; i < number; i++) {
			fs.writeFile(
				`../subjects/${subject}/${task}/input/input${i}.txt`,
				data[i].split(" ").join("\n"),
				(err) => {
					if (err) throw err;
				}
			);
		}
	},
};
