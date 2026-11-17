// import mongoose from 'mongoose';
// import { MONGODB_URI } from '$env/static/private';

// TODO: Change later, currently mongodb is not working with VS Code
// export type Todos = {
//     tasks: {task: string, complete: boolean, category: string, id:number}[]
// };
export type Todos = {
    task: string, complete: boolean, category: string, id:number
}

let todos: Todos[] = [];
let tasksCount = 0;

export function getTodos() {
    return todos;
}

export function getTodoItem(id: number) {
    for (const todo of todos) {
        if (todo.id == id) {
            return todo;
        }
    }

    return null;
}

export function createTask(todo: string) {
    tasksCount++;
    const item = {
        task: todo,
        complete: false,
        category: '',
        id: tasksCount
    }
    todos.unshift(item);
}

export function editTask(id: number, task: string, complete: boolean) {
    let item = getTodoItem(id);
    
    if (item == null) {
        return false;
    }

    item.task = task;
    item.complete = complete;
    return true;
}

export function toggle(id: number) {
    let todo = getTodoItem(id);
    
    if (todo == null) {
        return false;
    }
    
    todo.complete = !todo.complete;
    return true;
}
