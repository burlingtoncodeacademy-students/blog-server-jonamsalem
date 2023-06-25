let router = require ("express").Router()
let dbPath = "./api/blog.json"
let {readData} = require("../helpers/helper-functions")
let db = readData(dbPath)

router.get("/all", (req,res) =>{
    try {
        if (db.length == 0){
            res.status(200).json({
                message: `The blog is empty`
        })}
        else {
        res.status(200).json({
            message : db
        })}
    }
    catch(err){
        console.log(err)
    }
})


router.get("/:id", (req,res)=> {
    try{
        let {id} = req.params
        let specificComment = db.find(comment => comment.post_id == id)
        if (!specificComment) throw  Error ("Id not found") 

        res.status(200).json({
            message: specificComment
        })
    }
    catch (err) {
        res.status(500).json({
            message:  ` ID not found`
        })
    }
})

module.exports = router