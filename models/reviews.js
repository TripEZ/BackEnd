const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    reviewName:{
        type:String,
        required:true,
    },
    reviewEmail:{
        type:String,
        required:true,
    },
    reviewCountry:{
        type:String,
        required:true,
    },
    reviewText:{
        type:Schema.Types.Mixed,
        required:true,
    }
})

module.exports = mongoose.model('Reviews',reviewsSchema);
