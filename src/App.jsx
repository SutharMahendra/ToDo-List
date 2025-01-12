import { TodoProvider } from "./context/TodoContext"
import React, { useEffect, useState } from "react"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"




function App() {
  const [todos, setTodos] = useState([])

  const addTask = (todo) => {
    setTodos((prev) => [{ id: Date.now(), todo: todo, completed: false }, ...prev])
  }
  const deleteTask = (id) => {
    console.log('before');

    setTodos((prev) => prev.filter((preTodo) => preTodo.id !== id))
    console.log('after');

  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((preTodo) => (preTodo.id === id ? todo : preTodo)))
  }

  const toggleComplete = (id) => {
    setTodos((pre) => pre.map((preTodo) => preTodo.id === id ? { ...preTodo, completed: !preTodo.completed } : preTodo))

  }

  useEffect(() => {
    const savedTodo = localStorage.getItem('todos')
    if (savedTodo) {
      try {
        const todos = JSON.parse(savedTodo);
        if (todos) {
          setTodos(todos)
        } else {
          localStorage.removeItem('todos')
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem('todos')

      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTask, deleteTask, updateTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />

          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div
                className="w-full"
                key={todo.id}
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App
