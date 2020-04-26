const my_db = "my_kdusha";
const uploadDirectory = "uploads/";
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/my_kdusha";
// const ordersHandle = require("./ordersHandle");
const nodemailer = require("nodemailer");
let numOrder = 1;
const path = require("path");

function sendImg(req, res, imgToSend){
// console.log("1234321234");
const fullPathFileName = path.join(
  __dirname,
  uploadDirectory,
  imgToSend
);

res.sendFile(fullPathFileName);
}


function productImg(req, res, newFileName) {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, db) => {
      if (err) {
        return res.sendStatus(500);
      }
      var dbo = db.db(my_db);
      var myobj = {
        category: newFileName,
      };

      dbo.collection("products").findOne(myobj, (err, result) => {
        if (err) {
          return res.sendStatus(500);
        }
        if (result) {
          
          const fullPathFileName = path.join(
            __dirname,
            uploadDirectory,
            result.imgurl
          );
          return res.sendFile(fullPathFileName);
          // return res.sendStatus(200);
          // return res.send(result).status(200)
        } else {
          return res.sendStatus(400);
        }
      });
    }
  );
}

function addCategory(req, res) {
  console.log("/api is accessed");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(my_db);
    var myobj = { name: req.body.he, ename: req.body.en };
    dbo.collection("categories").insertOne(myobj, function (err, res) {
      if (err) {
        return res.sendStatus(500);
      }
      console.log("1 document inserted");
    });
  });
  res.status(201).send(req.body);
}

function insertNewItem(req, res) {
  console.log("/api is accessed");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(my_db);
    var myobj = {
      name: req.body.itemName,
      brand: req.body.brand,
      price: Number(req.body.price),
      imgurl: req.file.filename,
      category: req.body.currentCategory,
      date: new Date(),
      description: req.body.description,
    };
    dbo.collection("products").insertOne(myobj, function (err, res) {
      if (err) {
        return res.sendStatus(500);
      }
      console.log("1 document inserted");
    });
  });
  res.status(201).send({ body: req.body, file: req.file });
}

function getCategories(req, res) {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db(my_db);
      //Find all documents in the customers collection:
      dbo
        .collection("categories")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          res.send({ res: result });
          db.close();
        });
    }
  );
}

function products(req, res) {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db(my_db);
      //Find all documents in the customers collection:
      dbo
        .collection("products")
        .find({ category: req.query.category })
        .toArray(function (err, result) {
          if (err) throw err;
          res.send({ res: result });
          db.close();
        });
    }
  );
}

module.exports.sendImg = sendImg;
module.exports.products = products;
module.exports.productImg = productImg;
module.exports.getCategories = getCategories;
module.exports.insertNewItem = insertNewItem;
module.exports.addCategory = addCategory;
