const path = require('path');

module.exports = {
  images: (req, res) => {
    // let filePath = "./uploads/" + req.params.name;
    let mimeType = {
      "jpg":"image/jpg",
      "JPG":"image/jpg",
      "png":"image/png",
      "PNG":"image/png",
      "jpeg":"image/jpeg",
      "JPEG":"image/jpeg",
      "gif":"image/gif",
      "GIF":"image/GIF"
    }
    let fileName = req.params.name;
    let ext= fileName.substr(fileName.lastIndexOf('.')+1);
    let filepath = path.resolve(__dirname + '/../uploads/') +'/'+ fileName;
    console.log(filepath)
    res.type(mimeType[ext]).sendFile(filepath);


    // res.sendFile('index.html', { root: __dirname });


    // res.download(filePath);
  }
}
