const { spawn } = require("child_process");
const fs = require("fs");
import { getInputs } from "../input/getInput";

module.exports = async (number, subject, task) => {
	const pythonProcess = spawn("python3", [
		`src/subjects/${subject}/${task}/main.py`,
	]);
	pythonProcess.stdin.write(getInputs(number, subject, task).toString());

	pythonProcess.stdin.end();

	pythonProcess.stdout.on("data", (data) => {
		//console.log(`stdout (Base):\n${data}`);
		fs.writeFile(
			`./src/subjects/${subject}/${task}/out/base/output_base${number}.txt`,
			data,
			(err) => {
				if (err) throw err;
			}
		);
	});

	pythonProcess.stderr.on("data", (data) => {
		console.error(`stderr: ${data}`);
	});

	pythonProcess.on("close", () => {});
	return "done";
};
