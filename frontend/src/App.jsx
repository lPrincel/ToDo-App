import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todo'
import { useState, useEffect} from "react"

function App() {
  const [todos,setTodos]=useState([]);
  
  function fetchfun(){
    fetch("http://localhost:3000/todo")
      .then(async function(res){
        const json = await res.json();
        setTodos(json.todos)
      })
      .catch((error) => {
        console.error("Failed to fetch todos:", error);
      });
  }

  useEffect(()=>{
    fetchfun();
  },[])

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>To-Do App</h1>
      </header>
      <main className="app-main">
        <CreateTodo fetchfun={fetchfun}/>
        <Todos todos={todos} fetchfun={fetchfun}/>
      </main>
    </div>
  )
}

export default App