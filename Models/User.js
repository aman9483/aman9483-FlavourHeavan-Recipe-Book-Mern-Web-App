const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({

    name:{

        type: String,
        required: [true,'enter the name'],
        trim: true,
        maxLength: 50,
        
    },

    email:{

        type: String,
        required: [true,'enter the email'],
        validate: [validator.isEmail, "Please Enter a valid Email"],
        unique: true

    },

    password:{

        type: String,
        required: [true,'enter the password'],
        maxLength: 50,
        minLength: 8

    },

    createdAt: {
        type: Date,
        default: Date.now,
      },
    
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  
  
  UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };



module.exports = mongoose.model("User", UserSchema);