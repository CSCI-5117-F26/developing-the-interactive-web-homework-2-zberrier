<script lang='ts'>
    import { resolve } from '$app/paths';
    import { refreshAll } from '$app/navigation';

    const {tasks, filter, page} = $props();
    let todos = $state(tasks);
    // console.log(todos[0]._id);
    // console.log(todos[0]._id.$oid);

    async function toggle(id: string) {
        const res = await fetch('api/toggle', {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id})
        });
        if (res.ok) { await refreshAll(); }
    }
</script>

<h1>{page}</h1>
<ul>
    {#each todos as task}
        {#if filter == false || task.complete == true}
            <div>
                <input type='checkbox' bind:checked={task.complete} onchange={()=>{toggle(task._id.$oid)}}/>
                <a href={resolve('/todo/[id]', {id: task._id.$oid})} class:done={task.complete}>{task.task}</a>
            </div>
        {/if}
    {/each}
</ul>

<style>
    h1 {
        font-weight: bold;
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
</style>
