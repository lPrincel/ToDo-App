import { useState } from "react"

export function CreateTodo({fetchfun}){
    const [title,setTitle]=useState("");
    const [description,setDescription]= useState("");

    return <div className="create-todo-container glass-panel">
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
                        "Content-Type": "application/json"
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
                await fetchfun();
                setTitle('');
                setDescription('');
            })
            .catch((error) => {
                window.alert("Failed to connect to the server. Please try again.");
            });
        }}>
            <span>Add Task</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
    </div>
}