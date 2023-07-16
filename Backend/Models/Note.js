const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
      type: String,
      required: true //Means this field is required for user
  }, // String is shorthand for {type: String}
  description: {
      type: String,
      required: true
  },
  tag: {
      type: String,
      default: "General"
  },
  date: {
      type: Date, //Date is a datatype in js
      default: Date.now //Date.now is a function in js
  }
  
});

module.exports = mongoose.model('notes',notesSchema);