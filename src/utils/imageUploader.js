import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/courses/cover");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const allowedExt = [".jpg", ".jpeg", ".png"];
    if (!allowedExt.includes(ext)) {
      return cb(new Error("Only JPG, JPEG, PNG files are allowed"));
    }

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;

    cb(null, uniqueName);
  },
});

export const imageUploader = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});
