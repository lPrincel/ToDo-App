import { useState } from "react"

export function UserAuth({ setToken }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function signup(){
        fetch("http://localhost:3000/signup",{
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(async (res)=>{
            const json=await res.json();
            alert(json.msg);
        })
    }

    function signin(){
        fetch("http://localhost:3000/signin",{
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(async(res)=>{
            const json=await res.json();
            if(json.token){
                localStorage.setItem("token",json.token);
                setToken(json.token);
            }else{
                alert(json.msg);
            }
            setUsername('');
            setPassword('');

        })
    }

    return <div className="create-todo-container" style={{maxWidth: "400px", margin: "0 auto", marginTop: "10vh"}}>
        <h2 style={{textAlign: "center", marginBottom: "1.5rem"}}>Login or Sign Up</h2>
        <div className="input-group">
            <input className="glass-input" type="text" placeholder="username" value={username} onChange={(e)=>{ setUsername(e.target.value) }}/>
            <input className="glass-input" type="password" placeholder="password" value={password} onChange={(e)=>{ setPassword(e.target.value) }}/>
        </div>
        <div style={{display: "flex", gap: "10px", marginTop: "1rem"}}>
            <button className="primary-btn" style={{backgroundColor: "#28a745"}} onClick={signup}>Sign Up</button>
            <button className="primary-btn" onClick={signin}>Log In</button>
        </div>
    </div>
}