const express = require('express');

const app = express();
const MongoClient = require('mongodb');

let db;
const port = 3200;
app.use(express.json());

const uri = "mongodb+srv://mike-sezen:msezen@cluster0.cedk0.mongodb.net/backend?retryWrites=true&w=majority";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(uri, {useUnifiedTopology:true}, function(err,client){
    console.log("Connected to MongoDB successfully");
    db = client.db("blogs"); 
})

app.listen(port, function(req,res){
    console.log("listening at port " + port);
})

app.get('/addBlog', function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/addBlog', function(req,res){
    db.collection('blogs').insertOne(
        {
        title: "titleValue",
        author: "authorValue",
        content: "contentValue"
        },
    function(err,result){
        if(err) throw error;
        res.send("blog added successfully");
    })
})

app.get('/getBlogs', function(req,res){
    db.collection('blogs').find().toArray(function(error,documents){
        res.send(documents);
    })
})

app.post('/customBlog', function(req,res){
    db.collection('blogs').insertOne({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    }, function(err, result){
        if(err) throw err;
        res.send("blog added successfully");
    })
});