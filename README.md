# Purpose

This package is a toolbox for dealing with a component that can be editable. An editable component is always one of three states:

1. Read only state or User State
2. Admin state (Edit buttons appear)
3. Editing state (You can edit but you have not changed anything)
4. Dirty state (You have edited and now the component is savable)
5. Saving state (You are currently saving)
6. Error state (There was an error saving) On second thought this might not be part of this because errors can occur at any time, not just after saving.




1. Internall
1. A save function that can be implemented anywhere in your component. This function dispatches a "save" event from the component. Saving in this context does not mean saving to a third party source; it means 

# Contents

This package is a function that returns:

1. Some svelte stores (mode, editState, original, modified, displayValue)
2. Some functions that dispatch events (activateEditMode, save, cancel, edit, onReceieveValueProp)
3. Some constants (the possible values of mode and editState).

# Usage

1. 
