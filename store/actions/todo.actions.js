import { todoService } from "../../services/todo.service.js"
import { SET_TODOS, REMOVE_TODO, ADD_TODO, UPDATE_TODO, SET_FILTER_BY, SET_IS_LOADING } from "../reducers/todo.reducer.js"
import { store } from "../store.js";

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    // confirm before removing a todo :
    const approval = confirm("Are you sure you want to delete this todo? ")
    if (!approval) return
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

/*export function toggleTodo(todoId) {
    const todoToToggle = {...todo, isDone: !todo.isDone}
    return saveTodo(todo)
        .then(() => {
            store.dispatch({ type: UPDATE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot toggle todo', err)
            throw err
        })
}*/