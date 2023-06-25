let fs = require("fs")

function readData(dbPath){
    let file = fs.readFileSync(dbPath)
    if (!file.length){
        return []
    }
    else{
    return JSON.parse(file)
    }
}


function saveData(dbPath, data){
    fs.writeFileSync(dbPath, JSON.stringify(data))

}


module.exports = {readData, saveData}