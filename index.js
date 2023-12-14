import dotenv from "dotenv";
import express from "express";
import chatRouter from "./routes/transcription.js";
import multer from "multer";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.options("*", cors());

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".mp3");
  },
});

const upload = multer({ storage: storage });

app.use("/api", upload.single("file"), chatRouter);
app.get('/', (req, res) => {
  res.send('HELLO from Api')
})

app.listen(3000, () => {
  console.log(`Listening on port ${3000}`);
});
