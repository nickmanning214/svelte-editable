<script>
    import { writable, get } from 'svelte/store'
    import editable from '../../editable.js';

    //value as prop
    export let isAdmin;
    export let value;
    import {createEventDispatcher} from 'svelte';

    let {isAdminMode, isAdminState, becomeAdmin, abdicateAsAdmin, isEditMode, isDirtyMode, displayValue, becomeEditor, save, cancel, edit, handleNewValueFromProp, handleNewAdminFromProp} = editable(createEventDispatcher,value);
    window.getAll=function(){
        return $isAdminMode
    }
    $:{
        handleNewValueFromProp(value);
    }

    $:{
        handleNewAdminFromProp(isAdmin)
    }


    
    
    let input;

    function focusInput(e){
        e.focus();
        e.setSelectionRange(0, e.value.length)
    }

</script>
<style>

</style>
{#if $isAdminMode && $isEditMode}
    <input value={$displayValue} bind:this={input} on:keyup={e=>{
        if (e.keyCode == 13){
            if ($isDirtyMode) save();
            else cancel();
        }
        else {
            edit(e.target.value)}
        }
    } use:focusInput/>
    <button on:click={save} disabled={!$isDirtyMode}>Save</button>
    <button on:click={cancel}>Cancel</button>
{:else}
    <span on:click={()=>{
        if ($isAdminState) becomeEditor();
    }}>{$displayValue}</span>
{/if}
