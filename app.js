const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-Parser");

mongoose.connect("mongodb://localhost/nodekb");
let db = mongoose.connection;

//Check connection
db.once("open", function() {
  console.log("Connected to MondoDB");
});

//Check for db errors
db.on("error", function(err) {
  console.log(err);
});

//init app
const app = express();

//Bring in Models
let Article = require("./models/article");

//load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

//home route
//create the views folder and then index.pug it changes from res.send('Hello Ektor'); to res.render('index');
app.get("/", function(req, res) {
  Article.find({}, function(err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Activation Keys",
        articles: articles
      });
    }
  });
});

// Get Single Article
app.get("/article/:id", function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    res.render("article", {
      article: article
    });
  });
});

//Add route
app.get("/articles/add", function(req, res) {
  res.render("add_article", {
    title: "New Activation Code"
  });
});

//Add Submit POST route
app.post("/articles/add", function(req, res) {
  let article = new Article();
  // article.title = req.body.title;
  // article.author = req.body.author;
  // article.body = req.body.body;
  article.activationcode = req.body.activationcode;
  article.company = req.body.company;
  article.user = req.body.user;
  article.status = req.body.status;
  article.email = req.body.email;
  article.laserhead = req.body.laserhead;
  article.datalogger = req.body.datalogger;
  article.camera = req.body.camera;
  article.comments = req.body.comments;
  article.expirationdate = req.body.expirationdate;

  article.save(function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

// Load Edit Form
app.get("/article/edit/:id", function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    res.render("edit_article", {
      title: "Edit Activation Key",
      article: article
    });
  });
});

//update Submit POST route
app.post("/articles/edit/:id", function(req, res) {
  let article = {};
  // article.title = req.body.title;
  // article.author = req.body.author;
  // article.body = req.body.body;
  article.activationcode = req.body.activationcode;
  article.company = req.body.company;
  article.user = req.body.user;
  article.status = req.body.status;
  article.email = req.body.email;
  article.laserhead = req.body.laserhead;
  article.datalogger = req.body.datalogger;
  article.camera = req.body.camera;
  article.comments = req.body.comments;
  article.expirationdate = req.body.expirationdate;

  let query = { _id: req.params.id };

  Article.update(query, article, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

app.delete("/article/:id", function(req, res) {
  let query = { _id: req.params.id };
  Article.remove(query, function(err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
});

//start server
app.listen(3000, function() {
  console.log("Server started on port 3000..");
});
