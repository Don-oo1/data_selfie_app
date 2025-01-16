const express = require("express")
const dataStore = require("nedb")

const app = express()

const dataBase = new dataStore("database.db")
dataBase.loadDatabase()


app.use(express.static("public"))
app.use(express.json({limit: '1mb'}))

app.listen(3000, ()=>{
    console.log("lisning ")
})

app.get("/api", (request, response)=>{
     let d
    
    dataBase.find("",(err,doc)=>{
    
        response.json(doc)
    })
    
    
})

app.post("/api",async (request, response)=>{
    console.log(request.body)
   dataBase.insert(request.body)
    response.send("done")

})
