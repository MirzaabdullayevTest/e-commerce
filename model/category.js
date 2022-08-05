const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImg: {
        type: String,
        required: true
    }
})

module.exports = model('category', categorySchema)