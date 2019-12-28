let mongoose = require('mongoose');

// Article schema
let articleSchema = mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true
  // },
  // author:{
  //   type: String,
  //   required: true
  // },
  // body:{
  //   type: String,
  //   required: true
  // }
  activationcode: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  laserhead: {
    type: String,
    required: true
  },
  datalogger: {
    type: String,
    required: true
  },
  camera: {
    type: String,
    required: false
  },
  expirationdate: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: false
  },
});

let Article = module.exports = mongoose.model('Article', articleSchema)
