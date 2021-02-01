/* const express= require("express");
const app = express();
const port = 9900
// process.env.PORT || 9900

//day15

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient();   //connecting client with server
const mongourl = "mongodb://localhost:27017";
let db;    // obj of database we can use everywhere


// we have removed var city and var rest in day15


//health check for default url at localhost 9900
// health check tell that the server is wroking fine or not
app.get('/',(req, res)=>{
    res.send("Health OK");
});

//city Route
app.get('/city',(req, res)=>{
    db.collection('city').find().toArray((err, result)=>{
      if (err) throw err;
      res.send(result);
    })

});

//Rest route
app.get('/rest',(req, res)=>{
    res.send(rest);
});
// res.json(rest);........can also be written like this


//day 15 
//connecting our applicationwith mongo server
MongoClient.connect(mongourl,(err,connection)=>{
  if(err) console.log(err);
  //else
  db=connection.db('edudb');
  app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});

before
app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
*/


const express = require('express');
const app = express();                       //to use express method we are writing is as function and creating object
const port = 9900;
// process.env.PORT || 9900

//day15
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;            //connecting client with server
//const mongourl = "mongodb://localhost:27017";
const mongourl ='mongodb+srv://ayushi14:ayu123@cluster0.jcnys.mongodb.net/edudb?retryWrites=true&w=majority';

let db;                          // obj of database we can use everywhere

//written when apis lecture done day 17

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

// we have removed var city and var rest in day15


//health check for default url at localhost 9900
// health check tell that the server is wroking fine or not
//health Check
app.get('/',(req,res) => {
    res.send("Health Ok");
});

//city Route
/*
app.get('/city',(req,res) => {
    db.collection('city').find().toArray((err,result) => {
      if(err) throw err;
      res.send(result);
    })
   
});
*/
//rest per city
app.get('/rest/:id',(req,res) =>{
  var id = req.params.id
 // var abc = req.params.abc
  db.collection('restaurent').find({city:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
// res.json(rest);........can also be written like this

//day17

//city Route...sorting
app.get('/city',(req,res) => {
  let sortcondition = {city_name:1}; // ...1 mean acending and -1 means decending
  let limit =100
  if(req.query.sort && req.query.limit ){
    sortcondition = {city_name:Number(req.query.sort)};
    limit =Number(req.query.limit)
  }
  else if(req.query.sort){
    sortcondition = {city_name:Number(req.query.sort)}
  }else if(req.query.limit){
    limit =Number(req.query.limit)
  }
  db.collection('city').find().sort(sortcondition).limit(limit).toArray((err,result) => {
    if(err) throw err;
    res.send(result);
  })
 
});

//Rest route
app.get('/rest',(req,res) => {
  var condition ={};
    //meal +cost
    if(req.query.mealtype && req.query.lcost && req.query.hcost){
      condition={$and:[{"type.mealtype":req.query.mealtype},{cost:{$lt:Number(req.query.hcost),$gt:Number(req.query.lcost)}}]}
    }
    //meal +city
    else if(req.query.mealtype && req.query.city){
      condition={$and:[{"type.mealtype":req.query.mealtype},{city:req.query.city}]}
    }
    //meal +cuisine
    else if(req.query.mealtype && req.query.cuisine){
      condition={$and:[{"type.mealtype":req.query.mealtype},{"Cuisine.cuisine":req.query.cuisine}]}
    }
    //meal
    else if(req.query.mealtype){
      condition={"type.mealtype":req.query.mealtype}
    }
    //city
    else if(req.query.city){
      condition={city:req.query.city}
    }
  db.collection('restaurent').find(condition).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  }) 
})

//placeorder
app.post('/placeorder',(req,res)=>{
  db.collection('orders').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
})

//get all bookings
app.get('/orders',(req,res) => {
  db.collection('orders').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//MealType Route
app.get('/meal',(req,res) => {
  db.collection('mealType').find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//cuisine route
app.get('/cuisine',(req,res) => {
  db.collection('cuisine').find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//day 15 
//connecting our applicationwith mongo server
MongoClient.connect(mongourl,(err,connection) => {
  if(err) console.log(err);
  db = connection.db('edudb');

  app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
  })

})