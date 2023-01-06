import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body)
        cb(null, `./src/subjects/${req.body.subject_name}/${req.body.name}`)
    },
    filename: function (req, file, cb) {
        cb(null, "main.py")
    }
})
export default storage