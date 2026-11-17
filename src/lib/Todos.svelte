<script lang='ts'>
    import { resolve } from '$app/paths';
    import { refreshAll } from '$app/navigation';

    const props = $props();
    let todos = $state(props.tasks);

    async function toggle(id: number) {
        const res = await fetch('api/toggle', {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id})
        });
        if (res.ok) { await refreshAll(); }
    }
</script>

<h1>{props.page}</h1>
<ul>
    {#each todos as task (task.id)}
        {#if props.filter == false || task.complete == true}
            <div>
                <input type='checkbox' bind:checked={task.complete} onchange={()=>{toggle(task.id)}}/>
                <a href={resolve('/todo/[id]', {id: String(task.id)})} class:done={task.complete}>{task.task}</a>
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
