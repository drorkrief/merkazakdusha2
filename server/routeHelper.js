const my_db = "my_kdusha";
let uploadDirectory = "uploads";
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const path = require("path");
const mongodb = require('mongodb');




function deleteItemByAdmin(req, res){
let parentID = {_id: new mongodb.ObjectID(req.body.id, "second")}
    
MongoClient.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, function(err, db) {
    if (err) {
      return res.sendStatus(500);
    }
    var dbo = db.db(my_db);
    dbo.collection("products").deleteOne(parentID, function(err, obj) {
      if (err) {
         res.sendStatus(500);
      }
      
      console.log("1 document deleted");
    });
  });
  res.status(201).send(req.body);
}

function sendImg(res, imgToSend){
  if (process.env.NODE_ENV === "production") {
    uploadDirectory = "../uploads";
  }else{uploadDirectory = "uploads";}
  const fullPathFileName = path.join(
    __dirname,
    uploadDirectory,
    imgToSend
    );
  fullPathFileName? res.status(200).sendFile(fullPathFileName):res.sendStatus(400);
;}


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
          res.status(200).send(result.imgurl)
        } else {
          return res.sendStatus(400);
        }
      });
    }
  );
}

// --- upload changes in cat name to the db
function uploadCatChangesInMongo(req, res) {
  let response = res; 
  MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) {
      return res.sendStatus(500);
    };
    var dbo = db.db(my_db);
    let oldObj = new mongodb.ObjectID(req.body.id);
    var myobj = {$set:{ name: req.body.name } };
    dbo.collection("categories").updateOne({_id: oldObj},myobj, function (err, res) {
      if (err) {
        return response.sendStatus(500);
      }
      else{
        return response.status(201).send(req.body);
      }
     
    });
  });
}

function uploadChangesInMongo(req, res) {
  let response = res; 
  MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) {
      return res.sendStatus(500);
    };
    var dbo = db.db(my_db);
    let oldObj = new mongodb.ObjectID(req.body.id);
    // console.log({_id: oldObj}, "-----oldObj----oldObj");
    var myobj = {$set:{ name: req.body.name ,description:req.body.description, mkt:req.body.mkt, price:req.body.price, size:req.body.size} };
    dbo.collection("products").updateOne({_id: oldObj},myobj, function (err, res) {
      if (err) {
        return response.sendStatus(500);
      }
      else{
        return response.status(201).send(req.body);
      }
     
    });
  });
  // res.status(201).send(req.body);
}

function addCategory(req, res) {
  console.log("/addCategory is accessed");
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
  console.log("/insertNewItem is accessed");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(my_db);
    var myobj = {
      mkt: req.body.mkt,
      size: req.body.size,
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

module.exports.uploadCatChangesInMongo = uploadCatChangesInMongo;
module.exports.uploadChangesInMongo = uploadChangesInMongo;
module.exports.deleteItemByAdmin = deleteItemByAdmin;
module.exports.sendImg = sendImg;
module.exports.products = products;
module.exports.productImg = productImg;
module.exports.getCategories = getCategories;
module.exports.insertNewItem = insertNewItem;
module.exports.addCategory = addCategory;