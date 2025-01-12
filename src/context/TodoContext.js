import { createContext, useContext } from 'react'

export const TodoContext = createContext({
    todos:
        [
            {
                id: "1",
                todo: 'todo msg',
                completed: false
            }
        ],
    addTask: (todo) => { },
    deleteTask: (id) => { },
    updateTodo: (todo, id) => { },
    toggleComplete: (id) => { }

})

export const TodoProvider = TodoContext.Provider()

export const useTodo = () => {
    return useContext(TodoContext);
}