<script lang='ts'>
    const data = $props();
    const todoItem = $state(data.data);
</script>

<div id={todoItem.id}>
    <ui>
        <p>{todoItem.task}</p>
        <p>{todoItem.complete}</p>
        <p>{todoItem.category}</p>
    </ui>
</div>
