require('dotenv').config();
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express=require("express");
const { createTodo, updateTodo, userAuth } = require("./types");
const {User, Todo} = require("./db")
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors())

app.post("/signup",async function(req,res){
    const {username,password} = req.body;
    const parsedPayload = userAuth.safeParse(req.body);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "You set the wrong inputs"
        })
    }
    try{
    const user = await User.findOne({username});
        if(user){
            return res.status(411).json({
                msg: "Username already taken"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            msg: "User created successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }

})

app.post("/signin",async function(req,res){
    const {username, password} = req.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(403).json({
                msg: "User doesn't exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(403).json({
                msg: "Incorrect password"
            })
        }

        const token=jwt.sign({userId: user._id}, process.env.JWT_SECRET)

        res.json({token: token, msg: "Login successfully"});
    }
    catch(err){
        res.status(500).json({msg: "Internal Server Error"})
    }
})

function authmiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            msg: "Missing or invalid token"
        })
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        next();
    }catch(err){
        res.status(403).json({msg: "Invalid token"})
    }
}

app.post("/todo",authmiddleware,async function(req,res){
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You set wrong inputs"
        })
        return;
    }

    try{
        await Todo.create({
            title:createPayload.title,
            description: createPayload.description,
            completed: false,
            userId: req.userId
        })
    
        res.json({
            msg: "Todo created"
        })
    }
    catch(err){
        res.status(500).json({msg: "Internal Server Error"});
    }
})

app.get("/todo",authmiddleware,async function(req,res){
    try {
        const todos = await Todo.find({userId: req.userId})
        res.json({
            todos
        })
    } catch(err) {
        res.status(500).json({msg: "Internal Server Error"});
    }
})

app.put("/completed",authmiddleware,async function(req,res){
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You set the wrong inputs"
        })
        return;
    }
    
    try {
        await Todo.updateOne({
            _id: req.body.id,
            userId: req.userId
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

app.delete("/todo",authmiddleware,async function(req,res){
    const deletePayload=req.body;
    const parsedPayload = updateTodo.safeParse(deletePayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "You set the wrong inputs"
        })
    }
    try{
        const deletedTodo = await Todo.findOneAndDelete({_id: req.body.id,userId: req.userId})
        if(!deletedTodo){
            res.status(404).json({
                msg: "Todo not found"
            })
        }
        else{
            res.status(200).json({
                msg: "Todo deleted successfully"
            })
        }

    }catch(err){
        res.status(500).json({
            msg: "Internal Error"
        })
    }
})

app.listen(3000,"0.0.0.0",()=>{
    console.log("Server is listening on port 3000")
})