<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
    import Categories from "#lib/Categories.svelte";

    const { data } = $props();
    const {todos, userId, categories} = $derived(data);
</script>

<div id='todos' class='body'>
    <div id='categories'>
        <Categories categories={categories} path='/todos/[category]'/>
    </div>
    <div id='todosList'>
        <Todos tasks={todos} userId={userId} filter={false} page='Todos'/>

        <form method='POST' action='?/create'>
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

    /* #todosList {
        align-self: center;
    } */
</style>
