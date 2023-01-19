const { spawn } = require("child_process");
const fs = require("fs");
import { getInputs } from "../input/getInput";

module.exports = (number, subject, task, id) => {
	const inputs = getInputs(number, subject, task).toString();
	const pythonProcess = spawn("python3", [
		`src/subjects/${subject}/${task}/upload/${id}/main.py`,
	]);
	pythonProcess.stdin.write(inputs);

	pythonProcess.stdin.end();

	pythonProcess.stdout.on("data", (data) => {
		//console.log(`stdout (Upload):\n${data}`);
		fs.writeFile(
			`./src/subjects/${subject}/${task}/out/upload/${id}/output_upload${number}.txt`,
			data,
			(err) => {
				if (err) throw err;
			}
		);
	});

	pythonProcess.stderr.on("data", (data) => {
		console.error(`Upload stderr: ${data}`);
	});

	pythonProcess.on("close", (code) => {});
	return "done";
};
