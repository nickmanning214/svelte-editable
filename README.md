# Purpose

This package is a toolbox for dealing with a component that can be editable. An editable component is always one of three states:

1. Read only state or User State
2. Admin state (Edit buttons appear)
3. Editing state (You can edit but you have not changed anything)
4. Dirty state (You have edited and now the component is savable)
5. Saving state (You are currently saving)
6. Error state (There was an error saving) On second thought this might not be part of this because errors can occur at any time, not just after saving.

