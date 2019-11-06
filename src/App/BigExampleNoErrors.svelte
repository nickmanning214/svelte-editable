<script>
        import {createEventDispatcher} from 'svelte';
    import editable from '../editable.js';
    import Value from './demo/bool.svelte';

    const originalValue = 'hi';

    const {
        isReadOnlyState,
        isAdminState,
        isEditState,
        isDirtyState,
        isSavingState,
        
        isAdminMode,
        isEditMode,
        isDirtyMode,
        isSavingMode,



        displayValue,

        becomeAdmin,
        abdicateAsAdmin,

        becomeEditor,
        abdicateAsEditor,

        original,
        modified,
       
        edit,
        save,
        cancel,
        onReceieveValueProp
    } = editable(createEventDispatcher,originalValue);

    let currentError = '';

    function exec(func){
        return function(){
            currentError='';
            try{
                func(...arguments)
            }
            catch(e){
                currentError=e;
            }
        }
    }

</script>
<style>
    .error{color:red}
</style>

<button on:click={exec(becomeAdmin)}>Become Admin</button> 
<button on:click={exec(abdicateAsAdmin)} disabled={!$isAdminMode}>Abdicate as admin</button>
<button on:click={exec(becomeEditor)} disabled={!$isAdminMode}>Become Editor</button> 
<button on:click={exec(abdicateAsEditor)} disabled={!$isEditMode}>Abdicate as editor</button>

<input on:keyup={(e)=>{exec(edit)(e.target.value)}} value={$displayValue} disabled={!$isEditMode}/>
<button disabled={!$isDirtyMode} on:click={exec(save)}>Save</button>
<button disabled={!$isEditMode} on:click={exec(cancel)}>Cancel</button>

<br><br>
<div>isReadOnlyState: <Value value={$isReadOnlyState} /></div>
<div>isAdminState: <Value value={$isAdminState}/> isAdminMode: <Value value={$isAdminMode} /></div>
<div>isEditState: <Value value={$isEditState}/> isAdminMode: <Value value={$isEditMode}/></div>
<div>isDirtyState: <Value value={$isDirtyState}/>isDirtyMode: <Value value={$isDirtyMode}/></div>
<div>isSavingState <Value value={$isSavingState}/> isSavingMode: <Value value={$isSavingMode}/></div>

<div class='error'>{currentError}</div>
