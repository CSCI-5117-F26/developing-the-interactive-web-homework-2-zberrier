import { BSON, MongoClient, ObjectId } from 'mongodb';
import { attachDatabasePool } from "@vercel/functions";
import { MONGODB_URI } from '$app/env/private';
export const EJSON = BSON.EJSON; 

export const client = new MongoClient(MONGODB_URI);
attachDatabasePool(client);
export const database = client.db('todos');
const collection = database.collection('todos');

export type Todos = {
    userId: ObjectId,
    task: string,
    complete: boolean,
    category: string
}

export async function getTodos(userId: string) {
    if (!ObjectId.isValid(userId)) return false;

    const todos = await collection.find({userId: new ObjectId(userId)}).sort({_id: -1}).toArray();
    return EJSON.serialize(todos);
}

export async function getTodoItem(id: string, userId: string) {
    if (!ObjectId.isValid(id)) return null;
    if (!ObjectId.isValid(userId)) return null;

    const item = await collection.findOne({_id: new ObjectId(id), userId: new ObjectId(userId)});
    return item ? EJSON.serialize(item) : null;
}

export async function createTask(todo: string, userId: string) {
    if (!ObjectId.isValid(userId)) return false;

    const item = {
        userId: new ObjectId(userId),
        task: todo,
        complete: false,
        category: ''
    }
    await collection.insertOne(item);
}

export async function editTask(id: string, task: string, complete: boolean, userId: string) {
    if (!ObjectId.isValid(id)) return false;
    if (!ObjectId.isValid(userId)) return false;

    const item = await getTodoItem(id, userId);
    if (item == null) return false;

    const updatedItem = {
        userId: new ObjectId(userId),
        task: task,
        complete: complete,
        category: item.category
    }
    const res = await collection.replaceOne({_id: new ObjectId(id), userId: new ObjectId(userId)}, updatedItem);

    return (res.modifiedCount == 1 && res.matchedCount == 1); 
}

export async function toggle(id: string, userId: string) {
    if (!ObjectId.isValid(id)) return false;
    if (!ObjectId.isValid(userId)) return false;

    const todo = await getTodoItem(id, userId);
    if (todo == null) return false;

    const updatedTodo = {
        userId: new ObjectId(userId),
        task: todo.task,
        complete: !todo.complete,
        category: todo.category
    }
    const res = await collection.replaceOne({_id: new ObjectId(id), userId: new ObjectId(userId)}, updatedTodo);

    return (res.modifiedCount == 1 && res.matchedCount == 1);
}
