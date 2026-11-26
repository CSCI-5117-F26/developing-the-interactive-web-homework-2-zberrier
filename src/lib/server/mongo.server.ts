import { BSON, MongoClient, ObjectId } from 'mongodb';
import { attachDatabasePool } from "@vercel/functions";
import { MONGODB_URI } from '$app/env/private';
import { error } from '@sveltejs/kit';
export const EJSON = BSON.EJSON; 

export const client = new MongoClient(MONGODB_URI);
attachDatabasePool(client);

export const database = client.db('todos');
const collection = database.collection('todos');
const categories = database.collection('categories');

export type Todos = {
    userId: ObjectId,
    task: string,
    complete: boolean,
    category: string
}

export async function getTodos(userId: string, category?: string) {
    if (!ObjectId.isValid(userId)) return false;

    let filter;
    if (category != undefined) {
        filter = {userId: new ObjectId(userId), category: category};
    } else {
        filter = {userId: new ObjectId(userId)};
    }

    const todos = await collection.find(filter).sort({_id: -1}).toArray();
    // console.log(EJSON.serialize(todos));
    return EJSON.serialize(todos);
}

export async function getTodoItem(id: string, userId: string) {
    if (!ObjectId.isValid(id)) return null;
    if (!ObjectId.isValid(userId)) return null;

    const item = await collection.findOne({_id: new ObjectId(id), userId: new ObjectId(userId)});
    return item ? EJSON.serialize(item) : null;
}

export async function createTask(todo: string, userId: string, category?: string) {
    if (!ObjectId.isValid(userId)) return false;

    const item = {
        userId: new ObjectId(userId),
        task: todo,
        complete: false,
        category: category ?? ''
    }
    await collection.insertOne(item);
}

export async function editTask(id: string, task: string, complete: boolean, userId: string, category: string) {
    if (!ObjectId.isValid(id)) return false;
    if (!ObjectId.isValid(userId)) return false;

    let update;
    update = {$set: {task: task, complete: complete}};
    if (category != '') {
        update = {$set: {task: task, complete: complete, category: category}};
    }

    const res = await collection.updateOne({_id: new ObjectId(id), userId: new ObjectId(userId)}, update);

    return (res.modifiedCount == 1 && res.matchedCount == 1); 
}

export async function toggle(id: string, userId: string, complete: boolean) {
    if (!ObjectId.isValid(id)) return false;
    if (!ObjectId.isValid(userId)) return false;

    const update = {$set: {complete: complete}};
    const res = await collection.updateOne({_id: new ObjectId(id), userId: new ObjectId(userId)}, update);

    console.log(id);
    console.log(userId);
    console.log(res);

    return (res.modifiedCount == 1 && res.matchedCount == 1);
}

export async function getCategories() {
    const categoriesList = await categories.find().toArray();
    return EJSON.serialize(categoriesList);
}

export async function createCategory(category: string) {
    try {
        await categories.insertOne({category: category});
        return true;
    } catch (error) {
        error(400, 'Cannot create');
    }    
}

export async function deleteCategory(category: string) {
    const res = await categories.deleteOne({category: category});
    return res.deletedCount == 1;
}
