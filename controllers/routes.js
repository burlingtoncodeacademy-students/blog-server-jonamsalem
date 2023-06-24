let router = require ("express").Router()
let dbPath = "./api/blog.json"
let {readData} = require("../helpers/helper-functions")

router.get("/ones", (req,res) =>{
    try {
        let db = readData(dbPath)
        res.status(200).json({
            message : db
        })}
    
    catch(err){
        console.log(err)
    }
})

module.exports = router