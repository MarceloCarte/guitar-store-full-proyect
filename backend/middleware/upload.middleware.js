import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";

const uploadPath = path.join(process.cwd(), "public/uploads");
await fs.mkdir(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes."), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const processImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const originalPath = req.file.path;
    const tempPath = originalPath + "-tmp";

    await sharp(originalPath)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(tempPath);

    await fs.rename(tempPath, originalPath);

    next();
  } catch (error) {
    console.error("Sharp error:", error);
    next(error);
  }
};
