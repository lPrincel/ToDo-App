// todos =[
//     {
//         title: "go to gym",
//         description: "go to  gym 5pm to 7pm"
//     }
// ]
export function Todos({todos,fetchfun}){

    async function updateTodo(id){
        fetch("http://localhost:3000/completed",
            {   
                method:"PUT",
                headers: {"content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({id: id})
            }
        )
        .then(async(res)=>{
            const json=await res.json();
            alert(json.msg)
            fetchfun();
        })
        .catch(() => {
            alert("Failed to connect to the server. Please try again.");
        });
    }

    async function deleteTodo(id){
        fetch("http://localhost:3000/todo",{
            headers:{"content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "DELETE",
            body: JSON.stringify({id: id})
        })
        .then(async(res)=>{
            const json=await res.json();
            alert(json.msg);
            fetchfun();
        })
        .catch(()=>{
            alert("Failed to connect to the server. Please try again.");
        })
    }

    return <div className="todo-list">
        {todos.length === 0 ? (
            <div className="empty-state">No tasks yet. You're all caught up!</div>
        ) : todos.map((todo)=>{
            return <div key={todo._id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                    <h1 className="todo-title">{todo.title}</h1>
                    <p className="todo-desc">{todo.description}</p>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <button className={`status-btn ${todo.completed ? 'btn-completed' : ''}`} onClick={()=>{updateTodo(todo._id)}}>
                        {todo.completed ? "Done" : "Complete"}
                    </button>
                    <button className="status-btn" style={{borderColor: "#dc3545", color: "#dc3545"}} onClick={()=>{deleteTodo(todo._id)}}>Delete</button>
                </div>
            </div>
        })}
    </div>
}