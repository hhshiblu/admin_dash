import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const dicName = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const { name, ext } = path.parse(file.originalname);
    cb(null, `${name}_${dicName}${ext}`);
  },
});

const upload = multer({ storage: storage });
export default upload;
