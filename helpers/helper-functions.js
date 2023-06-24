let fs = require("fs")

function readData(dbPath){
    let file = fs.readFileSync(dbPath)
    return JSON.parse(file)
}


module.exports = {readData}