import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todo'
import { UserAuth } from './components/UserAuth';
import { useState, useEffect} from "react"

function App() {
  const [todos,setTodos]=useState([]);
  const [token,setToken]=useState(localStorage.getItem("token") || "");

  function fetchfun(){
    if(!token) return;
    fetch("http://localhost:3000/todo",{
      headers: {"Authorization": `Bearer ${token}`}
    })
      .then(async function(res){
        const json = await res.json();
        setTodos(json.todos || [])
      })
      .catch((error) => {
        console.error("Failed to fetch todos:", error);
      });
  }

  useEffect(()=>{
    fetchfun();
  },[token])

  return (
    <div className="app-wrapper">
      {!token ? <UserAuth setToken={setToken}/> : 
      (<>
        <header className="app-header">
          <h1>To-Do App</h1>
          <button className="status-btn" style={{marginTop: "10px", margin: "0 auto"}} onClick={()=>{
            localStorage.removeItem("token");
            setToken("");
          }}>Log Out</button>
        </header>
        <main className="app-main">
          <CreateTodo fetchfun={fetchfun}/>
          <Todos todos={todos} fetchfun={fetchfun}/>
        </main>
      </>)
      }
    </div>
  )
}

export default App