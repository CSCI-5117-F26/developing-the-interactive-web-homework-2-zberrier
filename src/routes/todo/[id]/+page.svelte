<script lang='ts'>
    import {resolve} from '$app/paths';

    const data = $props();
    const todoItem = $state(data.data);
    let editEnabled = $state(false);
</script>

<div id={todoItem.id}>
    {#if !editEnabled}
        <p>{todoItem.task}</p>
        <p>{todoItem.complete}</p>
        <button onclick={() => {editEnabled = !editEnabled}}>Edit</button>
    {:else}
        <form method='POST' action='?/edit'>
            <input type='text' name='id' value={todoItem.id} hidden>
            <input type='text' name='task' placeholder={todoItem.task}>
            <label>Complete <input type='checkbox' name='complete'></label>
            <button>Save</button>
        </form>
        <button onclick={() => {editEnabled = !editEnabled}}>Cancel</button>
    {/if}
    <a href={resolve('/todos')}>Todos</a>
</div>
