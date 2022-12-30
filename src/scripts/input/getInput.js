const fs = require("fs");

module.exports = (number, subject, task) => {
  const file = fs.readFileSync(
    `./subjects/subject1/lab1/input/input${number}.txt`
  );
  return file.toString();
};
