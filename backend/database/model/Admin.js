const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Admin = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  collection: 'admins'
})

module.exports = mongoose.model('Admin', Admin)