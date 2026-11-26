<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
	import { enhance } from "$app/forms";

    let { data } = $props();
    let {todos, userId, category} = $derived(data);
</script>

<div id={"todos"+category} class='body category'>
    <div id='todos'>
        <div>
            <Todos tasks={todos} userId={userId} filter={false} page='Todos'/>
        </div>
    </div>
    <div id='createCategory'>
        <form method='POST' action='?/create' class='pure-form-stacked' use:enhance>
            <label>New Todo Item: <input type='text' name='item' required/></label>
            <button id='createButton' class='pure-button'>Create Item</button>
        </form>
    </div>
</div>

<style>
    .category {
        display: flex;
        align-content: center;
    }
    #todos {
        flex-grow: 2;
        display: flex;
        justify-content: flex-end;
    }

    #createCategory {
        flex-grow: 2;
        display: flex;
        justify-content: center;
    }

    #createButton {
        background-color: rgb(91, 180, 80);
        border-radius: 0.5em;
    }
</style>
