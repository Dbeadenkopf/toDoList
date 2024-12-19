import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todos, setTodos] = useState([]); 
  // The state below is so Todoinput and Todolist can have access to the same state
const [todoValue, setTodoValue] = useState('');

// making a function to allow for local storage to execute 
// when all three functions are occuring
function persistData(newList){
  localStorage.setItem('todos', JSON.stringify({todos: 
    newList
  }))
}

// making a function that will update the todos state
function handleAddTodos(newTodo){
  const newTodoList = [...todos, newTodo]
  persistData(newTodoList)
  setTodos(newTodoList)
}

// making a function that will handle deleting items on the list
function handleDeleteTodos(index){
  const newTodoList = todos.filter((todo, todoIndex) =>{
    return todoIndex !== index
  })
  persistData(newTodoList)
  setTodos(newTodoList)
}

// making a function that will handle editing items on the list
function handleEditTodos(index){
  const valueToBeEdited = todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodos(index)
}

// making a useEffect for when the screen is refreshed we want to keep our current data
useEffect(() =>{
  if (!localStorage){
    return
  }
  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos = JSON.parse(localTodos).todos
  setTodos(localTodos)
}, [])
  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos={todos}/>
    </>
  )
}

export default App
