<script>
    import EditableShortText from './EditableShortText.svelte';
    let adminMode = false;
    let value = 'Hello';
</script>

<style>
    .admin-bar{
        display:flex;
        background:#eee;
    }
    label{display:flex;align-items:center;margin-right:30px;}
    input{margin:0}
    label input{
        margin-left:5px;
    }
</style>

<div class='admin-bar'>
    <label>
        Admin Mode
        <input type="checkbox" bind:checked={adminMode} />
    </label>
    <label>
        Value
        <input type='text' bind:value={value} />
    </label>
</div>
<div>
    <EditableShortText isAdmin={adminMode} value={value} on:save={(e)=>{
        value=e.detail.value;
    }}/>
</div>
<p>
    Bug, edit the "Value" text and you can now click on the text and edit it.
</p>
