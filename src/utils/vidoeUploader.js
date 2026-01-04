import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/courses/video");
  },
  filename: (req, file, cb) => {
    const fileName = Math.random() + Date.now() + file.originalname;

    const ext = path.extname(file.originalname);
    const validFormat = [".mp3", ".mp4"];
    if (validFormat.includes(ext.toLowerCase())) {
      cb(null, fileName);
    } else {
      cb(new Error("The file is only .mp3 | .mp4 "));
    }
  },
});

export const videoUploader = multer({ storage });
