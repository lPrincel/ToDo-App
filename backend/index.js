const express=require("express");
const { createTodo, updateTodo } = require("./types");
const {todo} = require("./db")
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors())

app.post("/todo",async function(req,res){
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You set wrong inputs"
        })
        return;
    }

    try{
        await todo.create({
            title:createPayload.title,
            description: createPayload.description,
            completed: false
        })
    
        res.json({
            msg: "Todo created"
        })
    }
    catch(err){
        res.status(500).json({msg: "Internal Server Error"});
    }
})

app.get("/todo",async function(req,res){
    try {
        const todos = await todo.find({})
        res.json({
            todos
        })
    } catch(err) {
        res.status(500).json({msg: "Internal Server Error"});
    }
})

app.put("/completed",async function(req,res){
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You set the wrong inputs"
        })
        return;
    }
    
    try {
        await todo.updateOne({
            _id: req.body.id
        },{
            completed: true
        })
        res.json({
            msg:"Todo marked as completed"
        })
    } catch(err) {
        res.status(500).json({msg: "Internal Server Error"});
    }
})

app.listen(3000,"0.0.0.0",()=>{
    console.log("Server is listening on port 3000")
})