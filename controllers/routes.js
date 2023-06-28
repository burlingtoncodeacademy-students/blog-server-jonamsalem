
// create instance of express for routes
let router = require ("express").Router()
// declare path for the makeshift database
let dbPath = "./api/blog.json"

// import and declare helper functions 
let {readData, saveData} = require("../helpers/helper-functions")

// read the database
let db = readData(dbPath)

//get request to get all comments in db
router.get("/all", (req,res) =>{
    try {
        // if db is empty
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

// get request to get one comment by its id
router.get("/:id", (req,res)=> {
    try{
        // if the id does not exist
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

// post request to create a new comment 
router.post("/create", (req,res) =>{
    try{
        // if request body lacks any of the requirements to post a comment
        if (Object.keys(req.body).length <3) throw  Error("Please fill all the requirements")
        let newPost = req.body
        // id is created by finding the length of the db array and adding 1
        post_id = db.length +1
        // new post includes id first followed by rest of request
        newPost = {post_id, ...req.body}
        // push new post to db array and overide the json file with new db
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

// update comment by id. Requires all of the items within the body.
router.put("/update/:id", (req,res) => {
    try{
    let {id} = req.params
    // use filter to get array of comment with same id
    let specificComment = db.filter(comment => comment.post_id == id)[0]
    // if array empty
    if (!specificComment) throw Error ("cannot find comment ID")
    // get index of comment from origin db
    let specificCommentIndex = db.indexOf(specificComment)
    // checks for values that user put in body and changes any that changed from original message.
    db[specificCommentIndex].title = req.body.title ?? db[specificComment].title
    db[specificCommentIndex].author = req.body.author ?? db[specificComment].author
    db[specificCommentIndex].body = req.body.body ?? db[specificComment].body
    // overide the json file with new db
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

// delete comment based on id
router.delete("/delete/:id", (req,res) =>{
    try{
        let {id} = req.params
    // use find to get comment with same id
    let specificComment = db.find(comment => comment.post_id == id)
    // if id is not within the db
        if (!specificComment) throw  Error ("Id not found")
        // filter db array for comments that do not match the given id
        db = db.filter(comment => comment.post_id != id)
        // save updated db and overide json file
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

