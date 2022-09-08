const multer = require('multer');
const path = require('path');

const storageImg = multer.diskStorage({
    destination: (req,file,cb) => {
        if(file.fieldname === 'image'){
            cb(null, 'public/img/imgProducts')
        } else if (file.fieldname === 'avatar'){
            cb(null, 'public/img/users')
        }else{
            cb(null, 'public/img')

        }
    },
    filename: (req,file,cb) => {
        cb(null, 'Img-' + Date.now() + path.extname(file.originalname))
    }
});

const uploadImges = multer({
    storage : storageImg
});

module.exports = uploadImges