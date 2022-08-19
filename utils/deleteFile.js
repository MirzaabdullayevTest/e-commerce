const fs = require('fs')
const path = require('path')

const folder = path.join(require.main.filename)

module.exports = async (filename) => {
    await fs.unlink(folder + '/../public/images/' + filename, (err) => {
        if (err) throw new Error(err)
    })
}