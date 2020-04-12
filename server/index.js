console.log("app is loading");
const routeHelper = require("./routeHelper");

const express = require("express");
const app = express();

const utils2 = require('./production_utils')

const my_db = "my_kdusha";
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://localhost:27017/my_kdusha`;
// const ordersHandle = require("./ordersHandle");
const nodemailer = require("nodemailer");
let numOrder = 1;


let userId;
const jwtVerifier = require('express-jwt')

const utils = require("./auth_utils");
const multer = require("multer");
const uploadDirectory = "./client/public/images1/";
const upload = multer({ dest: uploadDirectory });

app.use(express.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: true }))



// ----- send email to manager when order done

function sendEmailToManege(orderData) {
  console.log(orderData, "orderData orderData vorderData orderData");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "merkazakdusha@gmail.com",
      pass: "moshe321moyal"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: "merkazakdusha@gmail.com",
    to: "770mdk@gmail.com",
    subject: `בוצעה הזמנה חדשה באתר`,
    html: `<h2>הזמנה מספר ${numOrder++}</h2><p>שם: ${
      orderData.user.name
    }</p><p>אימייל: ${orderData.user.email}</p><p>טלפון: ${
      orderData.user.phone
    }</p><p>סכום: ${orderData.order.sumCartAndDelivery}</p><p>מספר מוצרים: ${
      orderData.order.items.length
    }</p>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


//-----add Category by admin
app.post("/addCategory",jwtVerifier({secret:utils.secret}), (req, res) => {
  routeHelper.addCategory(req, res);
});
//-----upload item
app.post("/insertNewItem", upload.single("theImage"), (req, res) => {
  routeHelper.insertNewItem(req, res);

  
});
//----categories
app.get("/categories", (req, res) => {
  routeHelper.getCategories(req, res);
  
});
//################## query query query query query query
app.get("/products", (req, res) => {
  routeHelper.products(req, res);

});

// ------------------post order

app.post("/order", function(req, res) {
  //--is this email exist in my db?
  sendEmailToManege(req.body);

  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(err, db) {
      if (err) {
        return res.sendStatus(500);
      }
      var dbo = db.db(my_db);
      var myobj = {
        email: req.body.user.email
      };
      dbo.collection("users").findOne(myobj, function(err, result) {
        if (err) {
          return res.sendStatus(500);
        }

        if (result) {
          // if there is email like the query..
          var newvalues = {
            $set: { phone: req.body.user.phone, address: req.body.user.address }
          };
          console.log(result._id);
          userId = result._id;
          dbo
            .collection("users")
            .updateOne(myobj, newvalues, function(err, res) {
              if (err) {
                return res.sendStatus(500);
              }
              console.log("1 document updated");
            });

          // return res.status(200).send(result);
          // insert order to orders collection
          let newOrder = {
            userId: userId,
            delivery: req.body.order.delivery,
            sumCartAndDelivery: req.body.order.sumCartAndDelivery,
            items: req.body.order.items,
            note: req.body.user.note
          };
          dbo.collection("orders").insertOne(newOrder, function(err, res) {
            if (err) {
              return res.sendStatus(500);
            }
            console.log("1 document inserted");
          });
          return res.status(200).send("complete");
        } else {
          // if there is no email like the query..
          let newUser = {
            email: req.body.user.email,
            sendEmailes: true,
            name: req.body.user.name,
            address: req.body.user.address,
            phone: req.body.user.phone
          };
          dbo.collection("users").insertOne(newUser, function(err, res2) {
            if (err) {
              return res.sendStatus(500);
            }

            console.log(res2.insertedId, "1 document inserted");
            userId = res2.insertedId;

            // return res.status(200).send("not found 2");
            // insert order to orders collection
            let newOrder = {
              userId: userId,
              delivery: req.body.order.delivery,
              sumCartAndDelivery: req.body.order.sumCartAndDelivery,
              items: req.body.order.items,
              note: req.body.user.note
            };
            dbo.collection("orders").insertOne(newOrder, function(err, res) {
              if (err) {
                return res.sendStatus(500);
              }
              console.log("1 document inserted");
            });
            return res.status(200).send("complete");
          });
        }
      });
    }
  );
  // res.end("yes");
});

///==========get img to ech category
app.get("/img", (req, res) => {
  // console.log(req.query.category);
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(err, db) {
      if (err) {
        return res.sendStatus(500);
      }
      var dbo = db.db(my_db);
      //Find all documents in the customers collection:
      dbo
        .collection("products")
        .find({ category: req.query.category })
        .toArray(function(err, result) {
          if (err) throw err;
          // console.log(result);
          res.send({ res: result });
          db.close();
        });
    }
  );
});

//===========post LOGIN admin

app.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err, db) => {
        if (err) {
          return res.sendStatus(500);
        }
        var dbo = db.db(my_db);
        var myobj = {
          email: req.body.email,
          password: req.body.password
        };

        dbo.collection("admin").findOne(myobj, (err, result) => {
          if (err) {
            return res.sendStatus(500);
          }
          if (result) {
            // console.log(`result is ${result.email}`);
            let resCode = utils.createToken(result);
            res.send(resCode).status(200);
            // return res.sendStatus(200);
          } else {
            res.sendStatus(400);
          }

          // adminData = result;
        });
      }
    );
    // console.log("server =====", req.body.email, req.body.password);
  } else {
    return res.sendStatus(404);
  }
});

//===========post contact

app.post("/contact", function(req, res) {
  if (req.body.email) {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function(err, db) {
        if (err) {
          return res.sendStatus(500);
        }
        var dbo = db.db(my_db);
        var myobj = {
          email: req.body.email,
          massage: req.body.massage,
          sendEmailes: req.body.sendEmailes,
          name: req.body.name1,
          phone: req.body.phone
        };
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) {
            return res.sendStatus(500);
          }
          // console.log("1 document inserted");
          db.close();
        });
      }
    );
  } else {
    return res.status(400).send({
      message: "This is an error!"
    });
  }

  res.end("yes");
});
// ---get feed-----
app.get("/feed", (req, res) => {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(err, db) {
      if (err) {
        return res.sendStatus(500);
      }
      var dbo = db.db(my_db);
      //Find all documents in the customers collection:
      dbo
        .collection("feed")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          res.send({ res: result });
          db.close();
        });
    }
  );
});

//--------------------
app.get("/products", (req, res) => {
  // console.log("root is accessed");
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
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          res.send({ res: result });
          db.close();
        });
    }
  );
});
app.get("/pic", (req, res) => {
  res.send({ res: "result from server 123" });
});

utils2.handleProduction(express,app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
