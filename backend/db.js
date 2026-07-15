require ('dotenv').config()
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to MongoDb"))
    .catch(err=>console.log("Database connection error: ",err))
    
const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
    
    
const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
    
const User = mongoose.model('User',UserSchema, 'app_users');
const Todo = mongoose.model('Todo',TodoSchema);

module.exports = {
    User,
    Todo
}