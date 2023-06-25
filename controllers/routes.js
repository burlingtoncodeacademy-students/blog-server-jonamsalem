let router = require ("express").Router()
let dbPath = "./api/blog.json"
const { json } = require("express")
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
        res.status(500).json({
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
        res.status(500).json({
            message: `${err}`
        })
    }
})


router.post("/create", (req,res) =>{
    try{
        if (Object.keys(req.body).length <3) throw  Error("Please fill all the requirements")
        let newPost = req.body
        id = db.length +1
        newPost = {id, ...req.body}
        db.push(newPost)
        saveData(dbPath, db)
        res.status(200).json({
            message: `blog activity added `
        })
    }
    catch (err){
        res.status(500).json({
            message : `${err}`
        })
    }
})


router.put("/update/:id", (req,res) => {
    try{
    let {id} = req.params
    let specificComment = db.filter(comment => comment.post_id == id)[0]
    if (!specificComment) throw Error ("cannot find comment ID")
    let specificCommentIndex = db.indexOf(specificComment)
    db[specificCommentIndex].title = req.body.title ?? db[specificComment].title
    db[specificCommentIndex].author = req.body.author ?? db[specificComment].author
    db[specificCommentIndex].body = req.body.body ?? db[specificComment].body
    saveData(dbPath, db)
    res.status(200).json({
        message: `Comment changed successfully`
    })
    }
    catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.delete("/delete/:id", (req,res) =>{
    try{
        let {id} = req.params
        let specificComment = db.find(comment => comment.post_id == id)
        if (!specificComment) throw  Error ("Id not found")
        db = db.filter(comment => comment.post_id != id)
        saveData(dbPath, db)
        res.status(200).json({
            message: `Post with ID num ${id} deleted`
        })
    }
    catch (err){
        res.status(500).json({
            message: `${err}`
        })
    }
})


module.exports = router