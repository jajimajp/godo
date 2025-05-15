import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const todos = [
    { id: 1, title: 'タスク１', completed: true  },
    { id: 2, title: 'タスク２', completed: false },
    { id: 3, title: 'タスク３', completed: false },
  ]

  const addTodo = () => { alert('addTodo: まだ実装されていません！') }
  const completeTodo = () => { alert('completeTodo: まだ実装されていません！') }

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
root.render(<App />)

