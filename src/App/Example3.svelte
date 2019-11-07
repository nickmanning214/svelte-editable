<script>
     import Example3 from './Example3Inner.svelte';
    let isAdmin = false;
</script>
<style>
    .error{color:red}
</style>
<button on:click={()=>isAdmin=true}  disabled={isAdmin}>Become Admin</button> 
<button on:click={()=>isAdmin=false} disabled={!isAdmin}>Abdicate as admin</button>
<Example3 isAdmin={isAdmin}/>
