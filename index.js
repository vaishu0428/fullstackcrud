const express=require("express")
const app=express()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>
{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)
app.listen(8080,async()=>
{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err)
    {
        console.log("Not connected")
    }
    console.log("Server is running")
})
