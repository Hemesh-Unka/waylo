var express = require('express');
var app = express();

var distDir = __dirname + '/public';
app.use(express.static(distDir));

// Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mongoose
var mongoose = require('mongoose');

// Create the database connection
mongoose.connect(process.env.MONGOLAB_URI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({
    error: message,
  });
}

var itemSchema = mongoose.Schema({
  id: Number,
  title: String,
  uri: String,
  any: {},
});

var Item = mongoose.model('Item', itemSchema, 'products');

app.get('/api/catalog/search', function (req, res) {
  Item.find({}, function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get products.');
    } else {
      res.status(200).json(docs);
    }
  });
});

// Checks to see if string has spaces
function hasSpaces(string) {
  return string.indexOf(' ') !== -1;
}

// Returns string into uri format ie. some-random-beer-brand
function createUri(string) {
  return string.toLowerCase().trim().split(/\s+/).join('-');
}

app.get('/api/catalog/products/:product', function (req, res) {

  var query = req.params.product;

  // Handles which query to be searched (uri, or product title)
  hasSpaces(query) ? queryType = { title: query } : queryType = { uri: query };

  Item.findOne(queryType, function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to find anything.');
    } else {
      res.status(200).json(docs);
    }
  });
});

// Code that adds uri to each item.

app.get('/api/uri', function (req, res) {
  Item.find({}, function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get products.');
    }

    for (var i = 0; i < docs.length; i++) {
      var newUri = createUri(docs[i].title);
      Item.findOneAndUpdate({
          id: docs[i].id,
        }, {
          $set: {
            uri: newUri,
          },
        },
        function (err, doc) {
          if (err) {
            console.log('Something wrong when updating data!');
          }
        });
    }
  });
});

/*
//Code to clean DB if website stuffed up during parsing! (Deletes all item with singles in it (Needs work)
app.get('/catalog/clean', function (req, res) {
  Item.remove({ 'prices': { '$size': 1 }}, function(err, docs) {
      if (err) {
      handleError(res, err.message, 'Failed to get products.');
      } else {
      res.status(200).json(docs);
    }
  });
});
*/

app.get('/api/catalog/autosuggest', function (req, res) {
  var q = req.query.q;

  Item.find({
    title: new RegExp(q, 'i'),
  }, 'title', function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to find anything.');
    } else {
      res.status(200).json(docs);
    }
  });
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 8080!');
});
