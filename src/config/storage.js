//import multer from 'multer'
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("done");
        cb(null, `./src/subjects/${req.body.subject_name}/${req.body.name}`)
    },
    filename: function (req, file, cb) {
        cb(null, "main.py")
    }
})
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("done");

        cb(null, `./src/subjects/${req.body.subject_name}/${req.body.task_name}/upload/${req.body.id}`)
    },
    filename: function (req, file, cb) {
        cb(null, "main.py")
    }
})
module.exports = {
    storage, storageUser
}