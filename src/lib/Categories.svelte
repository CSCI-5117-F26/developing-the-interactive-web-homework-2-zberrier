<script lang='ts'>
	import { refreshAll } from '$app/navigation';
    import { resolve } from '$app/paths';
    const { categories, path } = $props();

    let newCategory = $state('');
    async function createCategory() {
        const res = await fetch('/api/category', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newCategory})
        });

        if (res.ok) { 
            newCategory = '';
            await refreshAll();
        }
    }

    async function deleteCategory(category: string) {
        const res = await fetch('/api/category', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({category})
        });
        if (res.ok) { await refreshAll(); }
    }
</script>

<div id='categories'>
    <div id='categoriesList'>
        <h2>Categories</h2>
        <ul>
            {#each categories as category}
            <li>
                <a href={resolve(path, {category: category.category})}>{category.category}</a>
                <button class='pure-button delete' onclick={async ()=>{deleteCategory(category.category)}}>Delete</button>
            </li>
            {/each}
        </ul>
    </div>
    <div id='createCategories' class='pure-form-stacked'>
        <label>New Category <input type='text' name='category' bind:value={newCategory}/></label>
        <button id='create' class='pure-button' onclick={async ()=>{createCategory()}}>Create</button>
    </div>
</div>

<style>
    #categories {
        display: flex;
        flex-direction: column;
    }

    li {
        margin: 1em;
    }

    button {
        border-radius: 0.5em;
    }

    #create {
        background-color: rgb(91, 180, 80);
    }

    .delete {
        font-size: 0.8em;
        background-color: rgb(240, 45, 14);
        margin: 1em;
    }
</style>
