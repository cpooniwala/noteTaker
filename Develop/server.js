//Dependencies

const express = require("express");
const path = require("path");

//Set up Express
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "public")));

//Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
