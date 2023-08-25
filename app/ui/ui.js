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

  async getStatusOpts() {
    let self = this;
    return await self.dao.getStatusOpts();
  }

  async getChecklistItems(userId, parms) {
    let self = this;
    return await self.dao.getChecklistItems(userId, parms.note);
  }

  async postChecklistItem(userId, parms) {
    let self = this;
    await self.dao.postChecklistItem(parms.noteId, parms.label);
    return await self.dao.getChecklistItem(userId, parms.categoryId);
  }

  async updateChecklistItem(userId, parms) {
    let self = this;
    await self.dao.updateChecklistItem(parms.id, parms.label, parms.isSelected, parms.active);
    //return await self.dao.getNotes(userId, parms.categoryId);
  }

}
module.exports = UI;
