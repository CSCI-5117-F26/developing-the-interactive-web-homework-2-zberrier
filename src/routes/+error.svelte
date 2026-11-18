<script lang='ts'>
    import {page} from '$app/state';
    import { resolve } from '$app/paths';
</script>

<h1>{page.status} Error</h1>
<p>{page.error.message}</p>
<a href={resolve('/todos')}>Todos</a>
