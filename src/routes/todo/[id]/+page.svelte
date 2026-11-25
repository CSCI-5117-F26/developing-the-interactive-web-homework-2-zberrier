<script lang='ts'>
    const data = $props();
    const todoItem = $state(data.data);
    let editEnabled = $state(false);
</script>

<div id={todoItem.id} class='body'>
    {#if !editEnabled}
        <p>{todoItem.task}</p>
        <button id='edit' class='pure-button' onclick={() => {editEnabled = !editEnabled}}>Edit</button>
    {:else}
        <form method='POST' action='?/edit' class='pure-form-stacked'>
            <input type='text' name='id' value={todoItem._id.$oid} hidden>
            <label>Task <input type='text' name='task' placeholder={todoItem.task} required></label>
            <label>Category <input type='text' name='category'/></label>
            <label><input type='checkbox' name='complete' checked={todoItem.complete}> Complete </label>
            <button id='save' class='pure-button'>Save</button>
        </form>
        <button id='cancel' class='pure-button' onclick={() => {editEnabled = !editEnabled}}>Cancel</button>
    {/if}
</div>

<style>
    button {
        border-radius: 0.5em;
    }

    #edit {
        background-color: rgb(238, 222, 3);
    }

    #cancel {
        background-color: rgb(240, 45, 14);
        margin-top: 1em;
    }

    #save {
        background-color: rgb(91, 180, 80);
    }
</style>
