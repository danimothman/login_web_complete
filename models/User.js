 var mongoose = require('mongoose');

//  var username = //require('mongoose')

 var userSchema = mongoose.Schema({
     username:{
         type:String,
         required:true

     },
    passwordHash:{
        type:String
    },
    email:String,
    createAt:{
        type:Date,
        default:Date.now
    }
})

var User = mongoose.model('user', userSchema);
module.exports = User;