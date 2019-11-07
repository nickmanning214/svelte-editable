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
    section{max-width:720px;}
</style>


<h1>Demo</h1>
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

<hr>
<section>
<h1>Example 1</h1>
<p>This is an example of the `editable` toolbox in action.</p>
<p>
    The "current state" of the component is kept track of internally inside of editable.js. It can be one of five different states: read only, admin, edit, dirty, and saving.
</p>
<p>
    There are functions provided to switch from one state to another. You can only go "up" from read only to admin, from admin to edit, from edit to dirty, and from dirty to saving. You can go down to any state.
</p>
<p>If you commit the wrong action at the wrong time, then an error is thrown. For example, try to click "Save". It will say you're not in edit mode so you can't save. </p>
<a href="/Example2">Example 2</a>
</section>
