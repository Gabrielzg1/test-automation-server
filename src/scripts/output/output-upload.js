const { spawn } = require("child_process");
const fs = require("fs");
import { getInputs } from "../input/getInput";


module.exports = (number, subject, task, id) => {

  const pythonProcess = spawn("python3", [
    `./src/subjects/${subject}/${task}/upload/${id}/main.py`,
  ]);
  pythonProcess.stdin.write(getInputs(number, subject, task).toString());


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
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => { });
  return "done";
};
