const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({ name: String }, {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  });

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;