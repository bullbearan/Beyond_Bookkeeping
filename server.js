const express = require("express");
const routes = require("./routes/root");

const app = express();

app.set("view engine", "ejs");
// load css files
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));

// access form data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/", routes);
app.listen(5000);
