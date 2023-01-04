const { spawn } = require("child_process");
const fs = require("fs");
import { getInputs } from "../input/getInput";

const data =
	"# Leitura de dados\n" +
	"n1 = int(input())\n" +
	"n3 = int(input())\n" +
	"n4 = int(input()) \nn6 = int(input()) \nprint(n1)\nprint(n3)";

module.exports = async (number, subject, task) => {
	await fs.writeFile(
		`./src/subjects/${subject}/${task}/main.py`,
		data,
		(err) => {
			if (err) console.log(err);
		}
	);

	const pythonProcess = spawn("python3", [
		`./src/subjects/${subject}/${task}/main.py`,
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
