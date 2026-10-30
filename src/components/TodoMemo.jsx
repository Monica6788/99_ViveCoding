function TodoMemo({ todo, onChange }) {
  return (
    <div className="todo-memo">
      <textarea
        value={todo.memo ?? ''}
        onChange={(e) => onChange(todo.id, e.target.value)}
        placeholder="Write a memo..."
        aria-label={`Memo for "${todo.title}"`}
        rows={3}
        autoFocus
      />
    </div>
  )
}

export default TodoMemo
