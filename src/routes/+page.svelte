<script lang='ts'>
	import { enhance } from '$app/forms';
    let signUpFlag = $state(false);
</script>

{#if !signUpFlag}
    <h1>Login</h1>
    <div id='emailPassword' class='signIn'>
        <form method='post' action='?/signinEmail' use:enhance>
            <label>Email <input type='email' name='email' required/></label>
            <label>Password <input type='password' name='password' required/></label>
            <button>Sign In</button>
        </form>
    </div>
    <button onclick={()=>{signUpFlag = true}}>Sign up</button>
{:else}
    <h1>Signup</h1>
    <div id='emailPassword' class='login'>
        <form method='post' action='?/loginEmail' use:enhance>
            <label>Name <input type='text' name='name' required/></label>
            <label>Email <input type='email' name='email' required/></label>
            <label>Password <input type='password' name='password' required/></label>
            <button>Signup</button>
        </form>
    </div>
    <button onclick={()=>{signUpFlag = false}}>Sign in</button>
{/if}
