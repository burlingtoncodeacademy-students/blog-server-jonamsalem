
// import dotenv and express 
require("dotenv").config()
let express = require ("express")
// create instance of express
let app = express()
// cors to prevent different origins accessing data
let cors = require("cors")

// user PORT and HOST from env file or use given values
let PORT = process.env.PORT || 4000
let HOST = process.env.HOST || "127.0.0.1"

// import the endpoints used for CRUD from the routes directory 
let routerControl = require("./controllers/routes")

// middleware that parses json
app.use(express.json())
app.use(cors())
// middleware that connects base url to all imported endpoints
app.use("/comments", routerControl)

// start server
app.listen(PORT, HOST, () =>{
    console.log(`Server listening on ${PORT} port`)
})

