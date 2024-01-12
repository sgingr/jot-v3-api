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
  },
  {
    name: 'post-category',
    path: '/category',
    method: 'post',
    handlerClass: 'ui/service',
    handlerMethod: 'postCategory'
  },
  {
    name: 'update-category',
    path: '/category',
    method: 'put',
    handlerClass: 'ui/service',
    handlerMethod: 'updateCategory'
  },
  {
    name: 'delete-category',
    path: '/category',
    method: 'delete',
    handlerClass: 'ui/service',
    handlerMethod: 'deleteCategory'
  },
  {
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
    path: '/checklist/item',
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
  {
    name: 'delete-checklist-items',
    path: '/checklist/items',
    method: 'delete',
    handlerClass: 'ui/service',
    handlerMethod: 'deleteAllChecklistItems'
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
