import multer from 'multer';

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValidFile = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValidFile) {
            uploadError = null;
        }

        cb(uploadError, './public/uploads/products');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname.replace(' ', '-');
        cb(null, fileName);
    },
});

const uploadFile = multer({ storage: storage });

export default uploadFile;
