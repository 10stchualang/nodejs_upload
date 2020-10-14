const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const { upload, multiple_upload } = require("./upload");
const bodyParser = require("body-parser");
const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.post("/upload-avatar", upload);
app.post("/upload-photos", multiple_upload);

//start app
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
