<script lang='ts'>
    import Todos from "#lib/Todos.svelte";
    import Categories from "#lib/Categories.svelte";

    let {data} = $props();
    let {todos, userId, categories} = $derived(data);
</script>

<div id='done' class='body'>
    <div id='categories'>
        <div>
            <Categories categories={categories} path='/done/[category]'/>
        </div>
    </div>
    <div id='todos'>
        <Todos tasks={todos} userId={userId} filter={true} page='Completed'/>
    </div>
</div>

<style>
    #done {
        display: flex;
        align-content: center;
    }

    #todos {
        flex-grow: 4;
    }

    #categories {
        flex-grow: 2;
        display: flex;
        justify-content: center;
    }
</style>
