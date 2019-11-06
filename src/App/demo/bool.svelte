<script>
export let value;
</script>
<style>
    .true{color:green}
    .false{color:red}
</style>
{#if value}<span class='true'>{value}</span>
{:else}<span class='false'>{value}</span>{/if}
