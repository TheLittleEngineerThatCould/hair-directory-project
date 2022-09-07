// Dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Stylist = require('./models/stylist.js');
const stylistData = require('./utilities/stylistData');


// Environment Variables
const app = express();
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

const db = mongoose.connection

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
  () => console.log('MongoDB connection established:', mongoURI)
)


// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())

// Routes
const stylistController = require('./controllers/stylist.js');

app.use('/stylist', stylistController);



app.listen(PORT, () => {
  console.log('Let\'s get things done on port', PORT)
})

// app.get('/seed', async (req, res) => {
//     console.log("in seed route")
//     await Stylist.deleteMany({});
//     await Stylist.insertMany(stylistData);
//     res.send('done!');
//   });

// app.listen(PORT, () => {
//     console.log(`*** Listening on http://localhost:${PORT} ***`)
// }) 