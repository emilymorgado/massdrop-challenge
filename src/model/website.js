import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let websiteSchema = new Schema({
  url: String,
  html: String
});

module.exports = mongoose.model('Website', websiteSchema);
