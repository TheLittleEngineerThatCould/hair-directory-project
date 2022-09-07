const mongoose = require('mongoose');

const stylistSchema = new mongoose.Schema({
    name: {type: String, require: true},
    city: {type: String, require: true},
    address: {type: String, require: true},
    averagePrice: {type: Number, require: true},
    img: {type: String, require: false}
});

const Stylist = mongoose.model('Stylist', stylistSchema);

module.exports = Stylist;