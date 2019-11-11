import { writable, get, derived } from 'svelte/store';

function assertState(state,errorMessage){
    
}


function editable(createEventDispatcher,initialValue,strictMode=true){
    const dispatch = createEventDispatcher();

    //Internally, update the score via currentState
    const READ_ONLY_STATE = 0;
    const ADMIN_STATE = 1;
    const EDIT_STATE = 2;
    const DIRTY_STATE = 3;
    const SAVING_STATE = 4;

    const currentState = writable(READ_ONLY_STATE);


    //Provide these stores to access the state

    //exact state values
    const isReadOnlyState = writable(null);
    const isAdminState = writable(null);
    const isEditState = writable(null);
    const isDirtyState = writable(null);
    const isSavingState = writable(null);
    //modes
    const isSavingMode = writable(null); // SAVING_STATE
    const isDirtyMode = writable(null); // SAVING_STATE or DIRTY_STATE
    const isEditMode = writable(null); // SAVING_STATE, DIRTY_STATE, or EDIT_STATE
    const isAdminMode = writable(null); // SAVING_STATE, DIRTY_STATE, EDIT_STATE, OR ADMIN_STATE

    //Automatically update the stores when the internal currentState is updated
    currentState.subscribe(newState=>{
        if (newState == READ_ONLY_STATE){
            
            isReadOnlyState.set(true);
            isAdminState.set(false);
            isEditState.set(false);
            isDirtyState.set(false);
            isSavingState.set(false);

            isSavingMode.set(false)
            isDirtyMode.set(false)
            isEditMode.set(false)
            isAdminMode.set(false)
            
        }
        else if (newState == ADMIN_STATE){

            isReadOnlyState.set(false);
            isAdminState.set(true);
            isEditState.set(false);
            isDirtyState.set(false);
            isSavingState.set(false);

            isSavingMode.set(false)
            isDirtyMode.set(false)
            isEditMode.set(false)
            isAdminMode.set(true)

        }
        else if (newState == EDIT_STATE){

            isReadOnlyState.set(false);
            isAdminState.set(false);
            isEditState.set(true);
            isDirtyState.set(false);
            isSavingState.set(false);

            isSavingMode.set(false)
            isDirtyMode.set(false)
            isEditMode.set(true)
            isAdminMode.set(true)

        }
        else if (newState == DIRTY_STATE){

            isReadOnlyState.set(false);
            isAdminState.set(false);
            isEditState.set(false);
            isDirtyState.set(true);
            isSavingState.set(false);

            isSavingMode.set(false)
            isDirtyMode.set(true)
            isEditMode.set(true)
            isAdminMode.set(true)

        }
        else if (newState == SAVING_STATE){

            isReadOnlyState.set(false);
            isAdminState.set(false);
            isEditState.set(false);
            isDirtyState.set(false);
            isSavingState.set(true);

            isSavingMode.set(true)
            isDirtyMode.set(true)
            isEditMode.set(true)
            isAdminMode.set(true)

        }

    });



    //Internally keep track of the original value and the modified value
    const original = writable(initialValue);
    const modified = writable(null);

    //Provide the updated value for display purposes
    const displayValue = derived([original,modified],([$original, $modified]) => $modified || $original);
    

    //Actions - use currentState, original, modified, and let everything else update from subscriptions

    //These functions update the currentState.
    //You can't jump from one state to the next arbitrarily. You have to come from the right state.
    function becomeAdmin(){
        if (get(currentState) == READ_ONLY_STATE){ 
            currentState.set(ADMIN_STATE);
            dispatch('becomeAdmin');
        }
        else if (get(currentState) >= ADMIN_STATE) throw Error('You are already an admin');

    }

    //You can only reliquish being an admin if you are an admin
    function abdicateAsAdmin(){

        if (get(currentState) == DIRTY_STATE){
            _cancel();
        }

        if (get(currentState) >= ADMIN_STATE) {
            currentState.set(READ_ONLY_STATE);
            dispatch('abdicateAsAdmin');
        }
        else if (get(currentState) < ADMIN_STATE) throw Error('You can\'t abdicate as an admin if you are not an admin');

    }

    //You can only become an editor from an admin
    function becomeEditor(){
        if (get(currentState) == READ_ONLY_STATE) throw Error('You are not an admin so you cannot enter edit mode');
        else if (get(currentState) == ADMIN_STATE) {
            currentState.set(EDIT_STATE);
            dispatch('becomeEditor');
        }
        else if (get(currentState) >= EDIT_STATE) throw Error('You are already in edit mode');

    }

    function abdicateAsEditor(){
        if (get(currentState) <= ADMIN_STATE) throw Error('You can\'t abdicate as an editor if you are not an editor');
        else if (get(currentState) == EDIT_STATE) {
            currentState.set(ADMIN_STATE);
            dispatch('abdicateAsEditor');
        }
        else if (get(currentState) == DIRTY_STATE) throw Error('You have to save or cancel before abdicating as an editor');
        else if (get(currentState) == SAVE_STATE) throw Error('You can\'t abdicate as an editor while saving. Wait until saving is finished.');
    }

    function edit(val){
        if (get(currentState) < EDIT_STATE) throw Error('How are you editing when you are not in edit mode?!');
        else{
            modified.set(val);
            if (get(currentState)==EDIT_STATE) {
                currentState.set(DIRTY_STATE);
            }
            else if (get(currentState)==DIRTY_STATE){
                if (val==get(original)) currentState.set(EDIT_STATE);
            }
            dispatch('edit',{value:val});
        }
    }

    function save(){
        if (get(currentState) < DIRTY_STATE) {
            if (get(currentState) == EDIT_STATE) throw Error('How are you saving when you are not in a dirty state?');
            else throw Error('How are you saving when your\'e not in edit mode?')
        }
        else{
            const savedValue = get(modified)
            original.set(savedValue);
            modified.set(null);
            if (get(currentState)==DIRTY_STATE) currentState.set(ADMIN_STATE);
            dispatch('save',{value:savedValue});
        }
    

    }

    function _cancel(){ //private methods don't dispatch or error check
        modified.set(null);
        currentState.set(ADMIN_STATE);
    }

    function cancel(){
        if (get(currentState) < EDIT_STATE) throw Error('How are you cancelling when you are not in edit mode?');
        else {
            _cancel();
            dispatch('cancel');
        }
    }

    function handleNewIsAdminFromProp(isAdmin){
        if (isAdmin & !get(isAdminMode)) becomeAdmin();
        else if (!isAdmin && get(isAdminMode)) abdicateAsAdmin();
    }

    function handleNewValueFromProp(value){
        original.set(value);
        if (get(currentState) >= ADMIN_STATE) currentState.set(ADMIN_STATE);
        modified.set(null);
    }

    return {
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
        displayValue,
       
        edit,
        save,
        cancel,
        handleNewIsAdminFromProp,
        handleNewValueFromProp

    }
}
export default editable;
