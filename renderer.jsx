import React from 'react'
import { createRoot } from 'react-dom/client'

const App = ({ initialTodos }) => {
  const [todos, setTodos] = React.useState(initialTodos)

  React.useEffect(() => {
    const callback = (todos) => setTodos(todos)
    const unsubscribe = todosClient.subscribeOnUpdate(callback)
    return unsubscribe
  }, [setTodos, todosClient])

  const addTodo = (formData) => {
    const title = formData.get('title')
    todosClient.add(title)
  }
  const completeTodo = (id) => { todosClient.complete(id) }

  return (
    <>
      <h1>やること & やったこと</h1>
      <form action={addTodo}>
        <input type="text" name="title" placeholder="新しくやること..." required />
        <button type="submit">追加</button>
      </form>
      <ul>
        {
          todos.map(({ id, title, completed }) => (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => completeTodo(id)}
                />
                {title}
              </label>
            </li>
          ))
        }
      </ul>
    </>
  )
}

const root = createRoot(document.getElementById('root'))
todosClient.list().then((todos) => root.render(<App initialTodos={todos} />))

