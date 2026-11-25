<script lang='ts'>
    import Todos from "#lib/Todos.svelte";

    const { data } = $props();
    const {todos, userId, category} = data;
</script>

<div id={"todos"+category} class='body'>
    <div id='todosList'>
        <Todos tasks={todos} userId={userId} filter={false} page='Todos'/>

        <form method='POST' action='?/create'>
            <input name='category' value={category} hidden>
            <label>New Todo Item: <input type='text' name='item' required/></label>
            <button class='pure-button'>Create Item</button>
        </form>
    </div>
    
</div>
