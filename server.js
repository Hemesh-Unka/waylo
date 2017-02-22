// EXPRESS -----
var express = require("express");
var app = express();

var distDir = __dirname + "/public";
app.use(express.static(distDir));

// BODY PARSER -----
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// MONGOOSE -----
var mongoose = require("mongoose");

// Create the database connection 
mongoose.connect(process.env.MONGOLAB_URI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var itemSchema = mongoose.Schema({ any: {} });
var Item = mongoose.model('Item', itemSchema, 'products');

app.get('/api/catalog/search', function (req, res) {
	Item.find({}, function(err, docs) {
	    if (err) { 
			handleError(res, err.message, "Failed to get products.");
	    } else {
			res.status(200).json(docs);
		}
	});
});

app.get('/api/catalog/products/:product', function (req, res) {
	Item.findOne({ 'title': req.params.product}, function(err, docs) {
	    if (err) { 
			handleError(res, err.message, "Failed to find anything.");
	    } else {		
			res.status(200).json(docs);
		}
	});
});

/*
//Code to clean DB if website stuffed up during parsing! (Deletes all item with singles in it (Needs work)
app.get('/catalog/clean', function (req, res) {
	Item.remove({ "prices": { "$size": 1 }}, function(err, docs) {
	    if (err) { 
			handleError(res, err.message, "Failed to get products.");
	    } else {
			res.status(200).json(docs);
		}
	});
});
*/

app.get('/api/catalog/autosuggest', function (req, res) {

	var q = req.query.q;
						
	Item.find({ 'title': new RegExp(q, 'i')}, 'title' , function(err, docs) {
	    if (err) { 
			handleError(res, err.message, "Failed to find anything.");
	    } else {
			res.status(200).json(docs);
		}
	});
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 8080!');
});