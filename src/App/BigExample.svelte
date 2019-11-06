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
<button on:click={exec(abdicateAsAdmin)}>Abdicate as admin</button>
<button on:click={exec(becomeEditor)}>Become Editor</button> 
<button on:click={exec(abdicateAsEditor)}>Abdicate as editor</button>

<input on:keyup={(e)=>{exec(edit)(e.target.value)}} value={$displayValue}/>
<button on:click={exec(save)}>Save</button>
<button on:click={exec(cancel)}>Cancel</button>

<br><br>
<div>isReadOnlyState: <Value value={$isReadOnlyState} /></div>
<div>isAdminState: <Value value={$isAdminState}/> isAdminMode: <Value value={$isAdminMode} /></div>
<div>isEditState: <Value value={$isEditState}/> isAdminMode: <Value value={$isEditMode}/></div>
<div>isDirtyState: <Value value={$isDirtyState}/>isDirtyMode: <Value value={$isDirtyMode}/></div>
<div>isSavingState <Value value={$isSavingState}/> isSavingMode: <Value value={$isSavingMode}/></div>

<div class='error'>{currentError}</div>

<p>
    The way this works is that there are states: read only, admin, edit, dirty, and saving. The order of these states is deliberate. You can only go from one to the next, and if you try to skip up a state then it throws an error.
</p>
<p>
    Should it be permissible to go down as many states as you want? The issue is with handling unsaved edited text and then abdicating.
</p>
<ol>
    <li>edit will check if your'e in the right state and throw error if not, set to dirty state from edit state, and will also set modified</li>
    <li>save will check if you're in the right state and throw error if not, (doesn't currently set to saving state because it's synchronous), set original/modified, and dispatch event.</li>
    <li>cancel will check if your'e int he right state and throw error if not, set the currentState, and set modified (to null)</li>
</ol>

