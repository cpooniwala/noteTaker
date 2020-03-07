//Load Data
const Data = require("../db/db.json");
const bodyParser = require("body-parser");
const uuid = require("uuid");

module.exports = function(app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // API GET Requests
  app.get("/api/notes", function(req, res) {
    res.json(Data);
  });

  app.get("/api/notes/:id", function(req, res) {
    const found = Data.some(Data => Data.id === req.params.id);
    if (found) {
      res.json(Data.filter(Data => Data.id === req.params.id));
    } else {
      res
        .status(400)
        .json({ msg: `no note with the id of ${req.params.id} found` });
    }
  });

  //API POST Requests
  app.post("/api/notes", function(req, res) {
    //console.log(Date.now());
    req.body.id = uuid.v4();
    console.log(req.body);
    Data.push(req.body);
    res.json(req.body);
  });

  // API Delete Request
  app.delete("/api/notes/:id", function(req, res) {
    const found = Data.some(Data => Data.id === req.params.id);
    if (found) {
      res.json({
        msg: "Member Deleted",
        members: Data.filter(Data => Data.id !== req.params.id)
      });
    } else {
      res
        .status(400)
        .json({ msg: `no note with the id of ${req.params.id} found` });
    }
  });
};
