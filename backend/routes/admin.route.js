const express = require('express');
const app = express();
const adminRoute = express.Router();

// User model
let Admin = require('../database/model/Admin');

// Add admin
adminRoute.route('/add-admin').post((request, response, next) => {
  Admin.create(request.body, (error, data) => {
    if (error) return next(error);
    else response.json(data);
  });
});

// Get all admins
adminRoute.route('/admin/').get((request, response) => {
  Admin.find((error, data) => {
    if (error) return next(error);
    else response.json(data);
  });
});

// Get user by id
adminRoute.route('/read-admin/:id').get((request, response, next) => {
  Admin.findById(request.params.id, (error, data) => {
    if (error) return next(error);
    else response.json(data);
  });
});

// Update admin
adminRoute.route('/update-admin/:id').put((request, response, next) => {
  Admin.findByIdAndUpdate(request.params.id, {
    $set: request.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      response.json(data);
      console.log('User successfully updated!');
    }
  });
});

// Delete admin
adminRoute.route('/delete-admin/:id').delete((request, response, next) => {
  Admin.findByIdAndRemove(request.params.id, (error, data) => {
    if (error) return next(error);
    else response.status(200).json({msg: data});
  });
});

module.exports = adminRoute;