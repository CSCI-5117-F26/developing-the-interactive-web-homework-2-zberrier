<script lang='ts'>
	import { enhance } from '$app/forms';
    let signUpFlag = $state(false);
</script>

<div id='root' class='body'>
    {#if !signUpFlag}
        <h1>Login</h1>
        <div id='emailPassword' class='signIn'>
            <form method='post' action='?/signinEmail' class='pure-form-stacked' use:enhance>
                <label>Email <input type='email' name='email' required/></label>
                <label>Password <input type='password' name='password' required/></label>
                <button class='pure-button submit'>Sign In</button>
            </form>
        </div>
        <button class='pure-button second' onclick={()=>{signUpFlag = true}}>Sign up</button>
    {:else}
        <h1>Signup</h1>
        <div id='emailPassword' class='login'>
            <form method='post' action='?/loginEmail' class='pure-form-stacked' use:enhance>
                <label>Name <input type='text' name='name' required/></label>
                <label>Email <input type='email' name='email' required/></label>
                <label>Password <input type='password' name='password' required/></label>
                <button class='pure-button submit'>Signup</button>
            </form>
        </div>
        <button class='pure-button second' onclick={()=>{signUpFlag = false}}>Sign in</button>
    {/if}
</div>

<style>
    button {
        border-radius: 0.5em;
    }

    .second {
        background-color: rgb(68, 140, 135);
        margin-top: 1em;
    }

    .submit {
        background-color: rgb(91, 180, 80);
    }
</style>
