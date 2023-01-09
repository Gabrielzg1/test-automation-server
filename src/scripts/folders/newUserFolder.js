const fs = require("fs");
const path = "./src/subjects";

module.exports = async (subject, taskName, id) => {
    const newTask = path + `/${subject}/${taskName}/upload/${id}`;
    try {
        if (!fs.existsSync(newTask)) {
            fs.mkdirSync(newTask);
        }
    } catch (err) {
        console.error(err);
    }
};
