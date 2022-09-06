const multer = require('multer');
const path = require('path');

const storageImg = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/img/userImg')
    },
    filename: (req,file,cb) => {
        cb(null, 'Img-' + Date.now() + path.extname(file.originalname))
    }
});

const uploadImges = multer({
    storage : storageImg
});

module.exports = {
    uploadImges
}