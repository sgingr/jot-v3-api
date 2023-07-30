'use strict'
const UiBase = require('ui/ui-base');

/*
| -----------------------------------------------------------------------
|  UI
| -----------------------------------------------------------------------
*/
class UI extends UiBase {
  async getCategories(userId) {
    let self = this;
    return await self.dao.getCategories(userId);
  }

  async getNotes(userId, parms) {
    let self = this;
    return await self.dao.getNotes(userId, parms.category);
  }

  async postNote(userId, parms) {
    let self = this;
    await self.dao.postNote(userId, parms.categoryId, parms.noteTitle, parms.content, parms.statusId);
    return await self.dao.getNotes(userId, parms.categoryId);
  }

  async updateNote(userId, parms) {
    let self = this;
    await self.dao.updateNote(parms.noteId, parms.noteTitle, parms.content, parms.statusId);
    return await self.dao.getNotes(userId, parms.categoryId);
  }

  async deleteNote(userId, parms) {
    let self = this;
    await self.dao.deleteNote(parms.noteId);
    return await self.dao.getNotes(userId, parms.categoryId);
  }

  async getStatusOpts(parms) {
    let self = this;
    return await self.dao.getStatusOpts();
  }

}
module.exports = UI;
