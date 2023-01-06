const fs = require("fs");
const path = "./src/subjects";

module.exports = async (subject, name) => {
	const newTask = path + `/${subject}/${name}`;
	try {
		if (!fs.existsSync(newTask)) {
			fs.mkdirSync(newTask);
			fs.mkdirSync(newTask + "/input");
			fs.mkdirSync(newTask + "/out");
			fs.mkdirSync(newTask + "/upload");
			fs.mkdirSync(newTask + "/out/base");
			fs.mkdirSync(newTask + "/out/upload");
			for (let i = 1; i < 11; i++) {
				await fs.writeFile(
					`./src/subjects/${subject}/${name}/out/base/output_base${i}.txt`,
					" ",
					(err) => {
						if (err) console.log(err);
					}
				);
			}
		}
	} catch (err) {
		console.error(err);
	}
};
