var mongoose = require('mongoose')
var listSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
var List = mongoose.model('List', listSchema);
module.exports = List;