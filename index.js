import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4} from "uuid";
import path from "path";

const app = express();

//multer middleware
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "/.uploads")
  },
  filename: function(req, res, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname)
  }
})

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-TYpe, Accept"
  )
  next()
})

app.use(express.json());
app.use(express.urlencoded({extended: ture}));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.json({message:"Video streaming POC"});
})

app.listen(8000, function() {
  console.log("App is listening at port 8000...");
})
