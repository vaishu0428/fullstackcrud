const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/Note.model")
noteRouter.post("/create",async(req,res)=>
{
    try{
   const note=new  NoteModel(req.body)
   await note.save()
   res.send("Notes.created")
    }
    catch(err)
    {
        res.send(err)
    }
})
noteRouter.get("/",async(req,res)=>
{
   const notes= await NoteModel.find()
   res.send(notes)
})
noteRouter.patch("/update/:id",async(req,res)=>
{
    const noteID=req.params.id
    const payload=req.body
    await NoteModel.findByIdAndUpdate({_id:noteID},payload)
    res.send("Deleteed")
})
noteRouter.delete("/delete/:id",async(req,res)=>
{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})
    res.send("Deleteed")
})
module.exports={noteRouter}