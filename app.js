require ("dotenv").config()
let express = require ("express")
let app = express()

let PORT = process.env.PORT || 4000
let HOST = process.env.HOST || "127.0.0.1"

let routerControl = require("./controllers/routes")

app.use(express.json())

app.use("/commentss", routerControl)

app.listen(PORT, HOST, () =>{
    console.log(`Server listening on ${PORT} port`)
})