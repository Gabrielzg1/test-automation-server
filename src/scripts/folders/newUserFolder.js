const fs = require("fs");
const path = "./src/subjects";

module.exports = async (subject, taskName, id) => {
    const newTask = path + `/${subject}/${taskName}/upload/${id}`;
    const ouputs = path + `/${subject}/${taskName}/out/upload/${id}`
    try {
        if (!fs.existsSync(newTask)) {
            fs.mkdirSync(newTask);
        }
        if (!fs.existsSync(ouputs)) {
            fs.mkdirSync(ouputs);
        }
        for (let i = 1; i < 11; i++) {
            await fs.writeFile(
                `./src/subjects/${subject}/${taskName}/out/upload/${id}/output_upload${i}.txt`,
                " ",
                (err) => {
                    if (err) console.log(err);
                }
            );
        }
    } catch (err) {
        console.error(err);
    }
};
