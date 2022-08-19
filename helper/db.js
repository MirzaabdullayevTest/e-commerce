const mongoose = require('mongoose')

module.exports = async function db(uri) {
    try {
        await mongoose.connect(uri, (err) => {
            if (err) throw new Error(err)
            console.log('MongoDB connected', uri);
        })
    } catch (error) {
        console.error(error);
    }
}