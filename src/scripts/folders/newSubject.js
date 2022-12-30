const fs = require("fs");
const path = "./src/subjects";

module.exports = (name) => {
  const newSubject = path + `/${name}`;
  try {
    if (!fs.existsSync(newSubject)) fs.mkdirSync(newSubject);
  } catch (err) {
    console.error(err);
  }
};
