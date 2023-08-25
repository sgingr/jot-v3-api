'use strict';
/*
| -----------------------------------------------------------------------
|  Routes - all endpoints and handler modules defined here
| -----------------------------------------------------------------------
*/
module.exports = [
  /*
  | -----------------------------------------------------------------------
  |  jot
  | -----------------------------------------------------------------------
  */
  {
    name: 'list-categories',
    path: '/categories',
    method: 'get',
    handlerClass: 'ui/service',
    handlerMethod: 'getCategories'
  }, {
    name: 'list-notes',
    path: '/notes',
    method: 'get',
    handlerClass: 'ui/service',
    handlerMethod: 'getNotes'
  },
  {
    name: 'post-note',
    path: '/note',
    method: 'post',
    handlerClass: 'ui/service',
    handlerMethod: 'postNote'
  },
  {
    name: 'update-note',
    path: '/note',
    method: 'put',
    handlerClass: 'ui/service',
    handlerMethod: 'updateNote'
  },
  {
    name: 'delete-note',
    path: '/note',
    method: 'delete',
    handlerClass: 'ui/service',
    handlerMethod: 'deleteNote'
  },
  {
    name: 'list-status',
    path: '/status',
    method: 'get',
    handlerClass: 'ui/service',
    handlerMethod: 'getStatusOpts'
  },
  /*
  | -----------------------------------------------------------------------
  |  Checklists
  | -----------------------------------------------------------------------
  */
  {
    name: 'list-checklist-items',
    path: '/checklist/items',
    method: 'get',
    handlerClass: 'ui/service',
    handlerMethod: 'getChecklistItems'
  },
  {
    name: 'update-checklist-item',
    path: '/checklist/item/:id',
    method: 'put',
    handlerClass: 'ui/service',
    handlerMethod: 'updateChecklistItem'
  },
  {
    name: 'post-checklist-item',
    path: '/checklist/item',
    method: 'post',
    handlerClass: 'ui/service',
    handlerMethod: 'postChecklistItem'
  },
  /*
  | -----------------------------------------------------------------------
  |  Auth stuffz
  | -----------------------------------------------------------------------
  */
  {
    name: 'register',
    path: '/register',
    method: 'post',
    handlerClass: 'ui/service',
    handlerMethod: 'register'
  },
  {
    name: 'login',
    path: '/login',
    method: 'post',
    handlerClass: 'ui/service',
    handlerMethod: 'login'
  },
  {
    name: 'user',
    path: '/user/:id',
    method: 'get',
    handlerClass: 'ui/service',
    handlerMethod: 'getUser'
  },
]
