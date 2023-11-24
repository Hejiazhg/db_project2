const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const mongoose = require("mongoose");
const { name } = require('ejs');
const { model } = mongoose;
//  mongoose connection

mongoose.connect("mongodb://127.0.0.1/Project2");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("we're connected!")
});
const restaurantSchema = new mongoose.Schema({
  RestaurantID: Number,
  Name: String,
  Location: String,
  CuisineType: String,
  PriceRange: String,
  ContactInfo: String,
  Menus: Array,
  Reservations: Array,
  Reviews: Array
});

const customerSchema = new mongoose.Schema({
  CustomerID: Number,
  Name: String,
  Email: String,
  PhoneNumber: String
});

var Restaurants = mongoose.model('Restaurant', restaurantSchema);
var Customers = mongoose.model('Customer', customerSchema);

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

app.get('/restaurants', async (req, res) => {
  const results = await Restaurants.find({});
  console.log(results);
  res.render('list-restaurants', { restaurants: results });
});


app.get('/add-restaurant', (req, res) => {
  res.render('add-restaurant');
});

app.post('/add-restaurant', async (req, res) => {
  const { name, location, cuisineType, priceRange, contactInfo } = req.body;

  var newRes = new Restaurants({
    Name: name,
    CuisineType: cuisineType,
    PriceRange: priceRange,
    Location: location,
    ContactInfo: contactInfo
  })

  await newRes.save();
  res.redirect('/restaurants');
}

);

app.get('/delete-restaurant/:id', async (req, res) => {

  await Restaurants.deleteOne({
    RestaurantID: req.params.id
  });
  res.redirect('/restaurants');

});

app.get('/delete-customer/:id', async (req, res) => {

  await Customers.deleteOne({
    CustomerID: req.params.id
  });
  res.redirect('/customers');

});

app.get('/customers', async (req, res) => {

  const results = await Customers.find({});
  res.render('list-customers', { customers: results });

});


app.get('/update-restaurant/:id', async (req, res) => {

  const restrowaurant = await Restaurants.findOne({
    RestaurantID: req.params.id
  })
  res.render('update-restaurant', { restaurant: restrowaurant });

});

app.post('/update-restaurant/:id', async (req, res) => {
  const { name, location, cuisineType, priceRange, contactInfo } = req.body;
  await Restaurants.findOneAndUpdate(
    {RestaurantID:req.params.id},
    {
      Name: name,
      CuisineType: cuisineType,
      PriceRange: priceRange,
      Location: location,
      ContactInfo: contactInfo
    }
  )

  res.redirect('/restaurants');
});
