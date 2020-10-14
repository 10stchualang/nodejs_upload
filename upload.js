const upload = (req, res, next) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv("./uploads/" + avatar.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

const multiple_upload = async (req, res, next) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let data = [];
      const photos = req.files.photos;

      photos.forEach((photo, i) => {
        //move photo to uploads directory
        photo.mv("./uploads/" + photo.name);

        //push file details
        data.push({
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size,
        });
      });

      console.log(data);
      //return response
      res.send({
        status: true,
        message: "Files are uploaded",
        data: data,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { upload, multiple_upload };
