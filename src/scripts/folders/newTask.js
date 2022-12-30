const fs = require("fs");
const path = "./src/subjects";

module.exports = (subject, name) => {
  const newTask = path + `/${subject}/${name}`;
  try {
    if (!fs.existsSync(newTask)) fs.mkdirSync(newTask);
    else alert("Já existe uma tarefa com esse nome");
  } catch (err) {
    console.error(err);
  }
};
