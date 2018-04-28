import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let websiteSchema = new Schema({
  url: String
});

module.exports = mongoose.model('Website', websiteSchema);
