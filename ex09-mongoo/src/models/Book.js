const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    borrowing:{
        type:String,
        required:true,
        default:"not_yet"
    },
    who:{
        type:String,
        default:"admin"
    }
})

module.exports = mongoose.model("Books" , BookSchema);