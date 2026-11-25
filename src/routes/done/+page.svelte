<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
    import Categories from "#lib/Categories.svelte";

    const {data} = $props();
    const {todos, userId, categories} = data;
</script>

<div id='done' class='body'>
    <Categories categories={categories} path='/done/[category]'/>
    <div id='todos'>
        <Todos tasks={todos} userId={userId} filter={true} page='Completed'/>
    </div>
</div>
