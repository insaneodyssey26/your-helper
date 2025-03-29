import multer from "multer"; // this is used to handle multipart/form-data

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //this function is used to determine within which folder the uploaded files should be stored.
        cb(null, './pulic/temp') // the uploaded files will be stored in the temp folder
    },
    filename: function (req, file, cb) { // this function is used to determine what the file should be named inside the folder.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage, });