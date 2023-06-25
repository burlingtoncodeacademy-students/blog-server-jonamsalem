// import fs for interactive functionality with the database
let fs = require("fs")

// read file and if empty return an empty array
// if file has content parse it (turn string into js object)
function readData(dbPath){
    let file = fs.readFileSync(dbPath)
    if (!file.length){
        return []
    }
    else{
    return JSON.parse(file)
    }
}

// saveData creates a JSON formatted string with provided data and imports it into the directed path.
// dbPath and data are given in the routes.js file
function saveData(dbPath, data){
    fs.writeFileSync(dbPath, JSON.stringify(data))

}


module.exports = {readData, saveData}