export function TodoPreview({ todo, onToggleTodo }) {
    const importanceClass = "importance"+todo.importance

    return (
        <article className={`todo-preview ${importanceClass}`}>
            <h2 className={(todo.isDone)? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
