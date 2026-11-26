<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
    import Categories from "#lib/Categories.svelte";
	import { enhance } from "$app/forms";

    let { data } = $props();
    let {todos, userId, categories} = $derived(data);
</script>

<div id='todos' class='body'>
    <div id='categories'>
        <Categories categories={categories} path='/todos/[category]'/>
    </div>
    <div id='todos'>
        <Todos tasks={todos} userId={userId} filter={false} page='Todos'/>
    </div>
    <div id='createForm'>
        <form method='POST' action='?/create' class='pure-form-stacked' use:enhance>
            <label>New Todo Item: <input type='text' name='item' required/></label>
            <button class='pure-button'>Create Item</button>
        </form>
    </div>
</div>

<style>
    button {
        background-color: rgb(91, 180, 80);
        color: black;
        border-radius: 0.5em;
    }

    #todos {
        display: flex;
        justify-content: center;
        flex-basis: 40%;
    }
</style>
