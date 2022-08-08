const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, // mirzaabdullayevtest@gmail.com
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    image: {
        type: String,
    }
})

module.exports = model('admin', adminSchema)