<script lang='ts'>
    import { resolve } from '$app/paths';

    // const {data} = $props();
    // const {todos} = data
    // console.log(todos);
</script>

<h1>Zoe's Todo List!</h1>
<!-- add single sign on -->
<!-- if already signed in, redirect to /todo -->
<a href={resolve('/todos')}>Todos</a>
