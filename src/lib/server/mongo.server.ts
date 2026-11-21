import { BSON, MongoClient, ObjectId } from 'mongodb';
import { attachDatabasePool } from "@vercel/functions";
import { MONGODB_URI } from '$app/env/private';
export const EJSON = BSON.EJSON; 

export const client = new MongoClient(MONGODB_URI);
attachDatabasePool(client);
export const database = client.db('todos');
const collection = database.collection('todos');

export type Todos = {
    id: ObjectId,
    task: string,
    complete: boolean,
    category: string
}

export async function getTodos() {
    const todos = await collection.find().sort({_id: -1}).toArray();
    return EJSON.serialize(todos);
}

export async function getTodoItem(id: string) {
    if (!ObjectId.isValid(id)) return null;
    const item = await collection.findOne({_id: new ObjectId(id)});
    return item ? EJSON.serialize(item) : null;
}

export async function createTask(todo: string) {
    const item = {
        task: todo,
        complete: false,
        category: ''
    }
    await collection.insertOne(item);
}

export async function editTask(id: string, task: string, complete: boolean) {
    if (!ObjectId.isValid(id)) return false;

    const item = await getTodoItem(id);
    if (item == null) return false;

    const updatedItem = {
        task: task,
        complete: complete,
        category: item.category
    }
    const res = await collection.replaceOne({_id: new ObjectId(id)}, updatedItem);

    return (res.modifiedCount == 1 && res.matchedCount == 1); 
}

export async function toggle(id: string) {
    if (!ObjectId.isValid(id)) return false;

    const todo = await getTodoItem(id);
    if (todo == null) return false;

    const updatedTodo = {
        task: todo.task,
        complete: !todo.complete,
        category: todo.category
    }
    const res = await collection.replaceOne({_id: new ObjectId(id)}, updatedTodo);

    return (res.modifiedCount == 1 && res.matchedCount == 1);
}
