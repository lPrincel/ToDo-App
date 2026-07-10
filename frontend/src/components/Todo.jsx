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
                headers: {"content-Type": "application/json"},
                body:JSON.stringify({id: id})
            }
        )
        .then(async(res)=>{
            const json=await res.json();
            alert(json.msg)
            await fetchfun();
        })
        .catch((error) => {
            alert("Failed to connect to the server. Please try again.");
        });
    }

    return <div className="todo-list">
        {todos.length === 0 ? (
            <div className="empty-state">No tasks yet. You're all caught up!</div>
        ) : todos.map((todo)=>{
            return <div key={todo._id} className={`todo-card glass-panel ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                    <h1 className="todo-title">{todo.title}</h1>
                    <p className="todo-desc">{todo.description}</p>
                </div>
                <button 
                    className={`status-btn ${todo.completed ? 'btn-completed' : 'btn-pending'}`} 
                    onClick={()=>{updateTodo(todo._id)}}
                >
                    {todo.completed ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                        <div className="circle-outline"></div>
                    )}
                    {todo.completed ? "Done" : "Complete"}
                </button>
            </div>
        })}
    </div>
}