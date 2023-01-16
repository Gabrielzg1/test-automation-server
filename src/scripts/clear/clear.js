const fs = require("fs");
module.exports = (number, subject, task, id) => {
	fs.writeFile(
		`./src/subjects/${subject}/${task}/out/upload/${id}/output_upload${number}.txt`,
		"",
		(err) => {
			if (err) throw err;
		}
	);
};
