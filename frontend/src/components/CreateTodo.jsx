import { useState } from "react"

export function CreateTodo({fetchfun}){
    const [title,setTitle]=useState("");
    const [description,setDescription]= useState("");

    return <div className="create-todo-container">
        <div className="input-group">
            <input 
                className="glass-input"
                type="text" 
                placeholder="What needs to be done?" 
                value={title} 
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}
            />
            <input 
                className="glass-input"
                type="text" 
                placeholder="Add a description (optional)" 
                value={description} 
                onChange={(e)=>{
                    setDescription(e.target.value)
                }}
            />
        </div>
        <button className="primary-btn" onClick={async ()=>{
            if(title=='' || description=='') return;
            fetch("http://localhost:3000/todo",
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }, 
                    body: JSON.stringify({
                        title: title,
                        description: description
                    })
                }
            )
            .then(async (res)=>{
                const json=await res.json();
                window.alert(json.msg);
                fetchfun();
                setTitle('');
                setDescription('');
            })
            .catch(() => {
                window.alert("Failed to connect to the server. Please try again.");
            });
        }}>Add Task</button>
    </div>
}