<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
    import {resolve} from '$app/paths';

    const {data} = $props();
    const {todos} = $state(data);
</script>

<div id='done'>
    <Todos tasks={todos} filter={true} page='done'/>
    <a href={resolve('/todos')}>Todos</a>
</div>
