let router = require ("express").Router()
let dbPath = "./api/blog.json"
let {readData, saveData} = require("../helpers/helper-functions")
let db = readData(dbPath)

router.get("/all", (req,res) =>{
    try {
        if (db.length == 0){
         throw  Error ("There are no blog comments")
        }  
        res.status(200).json({
            message : db
        })
    }
    catch(err){
        res.status(400).json({
            message: `${err}`
        })
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
        res.status(404).json({
            message: `${err}`
        })
    }
})


router.post("/create", (req,res) =>{
    try{
        if (Object.keys(req.body).length <4) throw new Error("Please fill all the requirements")
        let newPost = {...req.body}
        db.push(newPost)
        saveData(dbPath, db)
        res.status(200).json({
            message: `blog activity added `
        })
    }
    catch (err){
        res.status(404).json({
            message : `${err}`
        })
    }
})

module.exports = router