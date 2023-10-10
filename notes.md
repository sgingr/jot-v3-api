

User clicks a specific checklist:

#  GET /checklists/items/:note_id
    verify is user's checklist ?
    sorted by isChecked, date

User creates new item

#  POST /checklists/item

  return new checklist item only with id
  UI will add to top of list

User edits item: (check, rename, delete)

#  PUT /checklists/item/:checklistItemId

  return new checklist item only
  UI will add to top of list



  --------------------------------------------------

Tables
  
  checklist_items
    id 
    note_id
    label
    is_selected
    add_date
    toggle_date