import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.resolve(path.dirname(import.meta.url).replace('file:///', ''), '../storage/docs');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, `${file.fieldname}-${Date.now()}.docx`);
    }
});

const upload = multer({ storage });

export default upload;