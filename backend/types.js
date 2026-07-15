const zod=require("zod");

const createTodo=zod.object({
    title: zod.string(),
    description: zod.string()
})

const updateTodo=zod.object({
    id: zod.string()
})

const userAuth = zod.object({
    username:  zod.string().min(3),
    password: zod.string().min(3)
})

module.exports = {
    createTodo,
    updateTodo,
    userAuth
}