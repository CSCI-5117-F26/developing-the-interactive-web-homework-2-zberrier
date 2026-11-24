<script lang='ts'>
    import Todos from "#lib/Todos.svelte";

    const {data} = $props();
    const {todos, userId} = data;
</script>

<div id='done' class='body'>
    <Todos tasks={todos} userId={userId} filter={true} page='Completed'/>
</div>
