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
        type:Boolean,
        required:true,
        default:false
    },
    who:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        default:null
    }
})

module.exports = mongoose.model("Books" , BookSchema);