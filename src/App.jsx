import { useEffect, useState } from 'react'
import TodoMemo from './components/TodoMemo'
import './App.css'

const STORAGE_KEY = 'todo-app:todos'

const FILTERS = {
  all: { label: 'All', test: () => true },
  active: { label: 'Active', test: (t) => !t.done },
  done: { label: 'Done', test: (t) => t.done },
}

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [memoOpenId, setMemoOpenId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // storage unavailable; keep working in memory
    }
  }, [todos])

  const remaining = todos.filter((t) => !t.done).length
  const visible = todos.filter(FILTERS[filter].test)

  const addTodo = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTodos((prev) => [{ id: Date.now(), title, done: false }, ...prev])
    setText('')
  }

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id))

  const updateMemo = (id, memo) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, memo } : t)))

  const toggleMemo = (id) =>
    setMemoOpenId((current) => (current === id ? null : id))

  const clearDone =() => setTodos((prev) => prev.filter((t) => !t.done))

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.title)
  }

  const commitEdit = () => {
    const title = editText.trim()
    if (title) {
      setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, title } : t)),
      )
    } else {
      deleteTodo(editingId)
    }
    setEditingId(null)
  }

  return (
    <main className="todo">
      <h1>Todo List</h1>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo"
          autoFocus
        />
        <button type="submit" disabled={!text.trim()}>
          Add
        </button>
      </form>

      <div className="todo-filters" role="group" aria-label="Filter todos">
        {Object.entries(FILTERS).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            className={filter === key ? 'active' : ''}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="todo-empty">
          {todos.length === 0 ? 'Nothing to do yet. Add a task above.' : 'No todos in this view.'}
        </p>
      ) : (
        <ul className="todo-list">
          {visible.map((todo) => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.title}" as ${todo.done ? 'active' : 'done'}`}
              />
              {editingId === todo.id ? (
                <input
                  className="edit"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit()
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                  aria-label="Edit todo"
                  autoFocus
                />
              ) : (
                <span className="title" onDoubleClick={() => startEdit(todo)}>
                  {todo.title}
                </span>
              )}
              <button
                type="button"
                className={`icon-btn${todo.memo ? ' has-memo' : ''}`}
                onClick={() => toggleMemo(todo.id)}
                aria-expanded={memoOpenId === todo.id}
                aria-label={`Memo for "${todo.title}"`}
              >
                Memo
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => startEdit(todo)}
                aria-label={`Edit "${todo.title}"`}
              >
                Edit
              </button>
              <button
                type="button"
                className="icon-btn danger"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete "${todo.title}"`}
              >
                Delete
              </button>
              {memoOpenId === todo.id && (
                <TodoMemo todo={todo} onChange={updateMemo} />
              )}
            </li>
          ))}
        </ul>
      )}

      <footer className="todo-footer">
        <span>
          {remaining} {remaining === 1 ? 'item' : 'items'} left
        </span>
        <button
          type="button"
          className="icon-btn"
          onClick={clearDone}
          disabled={remaining === todos.length}
        >
          Clear completed
        </button>
      </footer>
    </main>
  )
}

export default App
