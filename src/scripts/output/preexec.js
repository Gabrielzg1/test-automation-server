const { spawn } = require("child_process");
const fs = require("fs");

module.exports = (number, subject, task, id) => {
    const pythonProcess = spawn("python3", [
        `src/subjects/${subject}/${task}/upload/${id}/main.py`,
    ]);
    pythonProcess.stdout.on("data", (data) => {
        //console.log(`stdout (Upload):\n${data}`);
        fs.writeFile(
            `./src/subjects/${subject}/${task}/out/upload/${id}/output_upload${number}.txt`,
            ' ',
            (err) => {
                if (err) throw err;
            }
        );
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Pre execute stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => { });
};
