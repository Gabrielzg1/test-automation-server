const { subtle } = require("crypto");
const fs = require("fs");

module.exports = (number, subject, task, id) => {
  const fileBase = fs.readFileSync(
    `./subjects/${subject}/${task}/out/base/output_base${number}.txt`
  );
  const fileUpload = fs.readFileSync(
    `./subjects/${subject}/${task}/out/upload/${id}/output_upload${number}.txt`
  );

  if (
    fileBase.toJSON().data.length != 0 &&
    fileUpload.toJSON().data.length != 0
  ) {
    if (Buffer.compare(fileBase, fileUpload) === 0) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (fileBase.toJSON().data.length == 0)
      console.log("Erro nas saídas esperadas");
    else console.log("O arquivo enviado não contém saídas");
  }
};
