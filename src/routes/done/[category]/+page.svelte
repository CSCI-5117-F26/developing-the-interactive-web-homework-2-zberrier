<script lang='ts'>
    import Todos from "#lib/Todos.svelte";

    const {data} = $props();
    const {todos, userId, category} = data;
</script>

<div id={"done"+category} class='body doneCategory'>
    <Todos tasks={todos} userId={userId} filter={true} page='Completed'/>
</div>

<style>
    .doneCategory {
        display: flex;
        justify-content: center;
    }
</style>
