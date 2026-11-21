<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
	import { enhance } from "$app/forms";
    import { resolve } from '$app/paths';

    const { data } = $props();
    const {todos} = data;
</script>

<div id='todos'>
    <form method='POST' action='?/create'>
        <label>New Todo Item: <input type='text' name='item' required/></label>
        <button>Create Item</button>
    </form>

    <Todos tasks={todos} filter={false} page='todos'/>
    <a href={resolve('/done')}>Done</a>
</div>
