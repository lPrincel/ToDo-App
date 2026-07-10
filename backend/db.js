require ('dotenv').config()
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to MongoDb"))
    .catch(err=>console.log("Database connection error: ",err))

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('Todo',TodoSchema);

module.exports = {
    todo
}