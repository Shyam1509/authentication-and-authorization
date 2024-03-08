const mongoose = require("mongoose")

const venderSchema = mongoose.Schema({  
    venderName:{
        type: String,
        required: true
    },

    venderEmail:{
        type: String,
        required: true
    },

    venderPassword:{
        type: String,
        required: true
    },

    isApproved:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Vender", venderSchema)