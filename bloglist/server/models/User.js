const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
  },
  name: String,
  passwordHash: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

// Mongoose unique validator
userSchema.plugin(uniqueValidator, {
  message: 'This {PATH} is already taken.',
});

// Change the 'toJSON' method to re-name the and stringify the 'id' field
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // The createdAt attribute may not always be definde (in populate for example)
    if (returnedObject.createdAt) {
      returnedObject.createdAt = returnedObject.createdAt.toJSON();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
