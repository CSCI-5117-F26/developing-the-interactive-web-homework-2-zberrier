<script lang='ts'>
    import { resolve } from '$app/paths';
    import { refreshAll } from '$app/navigation';

    // let {tasks, userId, filter, page} = $props();
    // let todos = $state(tasks);
    let props = $props();
    let todos = $derived(props.tasks);
    let userId = $derived(props.userId);
    let filter = $derived(props.filter);
    let page = $derived(props.page);

    async function toggle(id: string, complete: boolean) {
        const res = await fetch('/api/toggle', {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id, userId, complete})
        });
        if (res.ok) { await refreshAll(); }
    }
</script>

<div id='todos'>
    <h1>{page}</h1>
    <ul>
        {#each todos as task}
            {#if filter == false || task.complete == true}
                <div id='content'>
                    <input type='checkbox' bind:checked={task.complete} onchange={()=>{toggle(task._id.$oid, task.complete)}}/>
                    <a href={resolve('/todo/[id]', {id: task._id.$oid})} class:done={task.complete}>{task.task}</a>
                </div>
            {/if}
        {/each}
    </ul>
</div>

<style>
    h1 {
        font-weight: bold;
    }

    #content {
        overflow: hidden;
        display: flex;
        gap: 1em;
    }

    a {
        color: black;
        text-decoration: none;
    }

    a:hover {
        font-weight: bold;
    }

    a.done {
        text-decoration: line-through;
    }

    ul {
        display: flex;
        flex-direction: column;
    }

    #todos {
        display: flex;
        flex-direction: column;
        max-width: 40vw;
    }
</style>
