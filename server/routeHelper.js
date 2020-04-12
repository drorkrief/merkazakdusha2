const my_db = "my_kdusha";
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://localhost:27017/my_kdusha`;
// const ordersHandle = require("./ordersHandle");
const nodemailer = require("nodemailer");
let numOrder = 1;

function addCategory(req, res){
    console.log("/api is accessed");
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(my_db);
      var myobj = { name: req.body.he, ename: req.body.en };
      dbo.collection("categories").insertOne(myobj, function(err, res) {
        if (err) {
          return res.sendStatus(500);
        }
        console.log("1 document inserted");
      });
    });
    res.status(201).send(req.body);
}

function insertNewItem(req, res){
    console.log("/api is accessed");
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(my_db);
      var myobj = {
        name: req.body.itemName,
        brand: req.body.brand,
        price: Number(req.body.price),
        imgurl: `./images1/${req.file.filename}`,
        category: req.body.currentCategory,
        date: new Date(),
        description: req.body.description
      };
      dbo.collection("products").insertOne(myobj, function(err, res) {
        if (err) {
          return res.sendStatus(500);
        }
        console.log("1 document inserted");
      });
    });
    res.status(201).send({ body: req.body, file: req.file });
}

function getCategories(req, res){
    MongoClient.connect(
        url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        function(err, db) {
          if (err) throw err;
          var dbo = db.db(my_db);
          //Find all documents in the customers collection:
          dbo
            .collection("categories")
            .find({})
            .toArray(function(err, result) {
              if (err) throw err;
              res.send({ res: result });
              db.close();
            });
        }
      );
}

function products(req, res){

    MongoClient.connect(
        url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        function(err, db) {
          if (err) throw err;
          var dbo = db.db(my_db);
          //Find all documents in the customers collection:
          dbo
            .collection("products")
            .find({ category: req.query.category })
            .toArray(function(err, result) {
              if (err) throw err;
              res.send({ res: result });
              db.close();
            });
        }
      );
}



module.exports.products = products;
module.exports.getCategories = getCategories;
module.exports.insertNewItem = insertNewItem;
module.exports.addCategory = addCategory;