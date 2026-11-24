<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
    import {resolve} from '$app/paths';

    const {data} = $props();
    const {todos, userId} = data;
</script>

<div id='done'>
    <Todos tasks={todos} userId={userId} filter={true} page='done'/>
    <a href={resolve('/todos')}>Todos</a>
</div>
