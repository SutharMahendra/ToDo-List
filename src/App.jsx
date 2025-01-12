import { todo } from "node:test"
import { TodoProvider } from "./context"
import React, { useEffect } from "react"




function App() {
  const [todos, setTodos] = useState([])

  const addTask = (todo) => {
    setTodos((prev) => [{ id: Date.now(), todo: todo, completed: false }, ...prev])
  }
  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((preTodo) => preTodo.id !== id))
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((preTodo) => (preTodo.id === id ? todo : preTodo)))
  }

  const toggleComplete = (id) => {
    setTodos((pre) => pre.map((preTodo) => preTodo.id === id ? { id: id, todo, completed: (!preTodo.completed) } : preTodo))

  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', todos)
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTask, deleteTask, updateTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}

          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
