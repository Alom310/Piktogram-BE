module.exports = {
  images: (req, res) => {
    let filePath = "./uploads/" + req.params.name;
    res.download(filePath);
  }
}
