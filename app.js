const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = []; // empty array of new list
var workItems = []; // empty array of work list

app.set("view engine", "ejs"); //Templating

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    //formatting of the date
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options); // return the date as formated.
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});


// app.post("/work", function (req, res) {
//   var workItem = req.body.itemE;
//   workItems.push(workItem);

//   res.redirect("/work");
// });
app.listen(3000 || process.env.PORT, function () {
  console.log("Server started on port 3000");
});
