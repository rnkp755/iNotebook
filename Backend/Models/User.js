const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
      type: String,
      required: true //Means this field is required for user
  }, // String is shorthand for {type: String}
  email: {
      type: String,
      required: true,
      unique: true
  }, // String is shorthand for {type: String}
  password: {
      type: String,
      required: true
  }, // String is shorthand for {type: String}
  date: {
      type: Date, //Date is a datatype in js
      default: Date.now //Date.now is a function in js
  }
  
});
const User =  mongoose.model('user',userSchema);
User.createIndexes();
module.exports = User