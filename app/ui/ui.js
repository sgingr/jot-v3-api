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

  async postCategory(userId, parms) {
    let self = this;
    await self.dao.postCategory(userId, parms.name, parms.icon, parms.description, parms.hiddenInd);
    return await self.dao.getCategories(userId);
  }

  async updateCategory(userId, parms) {
    let self = this;
    await self.dao.updateCategory(parms.categoryId, parms.name, parms.icon, parms.description, parms.hiddenInd);
    return await self.dao.getCategories(userId);
  }

  async deleteCategory(userId, parms) {
    let self = this;
    await self.dao.deleteCategory(parms.categoryId);
    return await self.dao.getCategories(userId);
  }

  async getNotes(userId, parms) {
    let self = this;
    return await self.dao.getNotes(userId, parms.category);
  }

  async getRecentNotes(userId, parms) {
    let self = this;
    const limit = (parms.limit) ? parms.limit : 50;
    return await self.dao.getRecentNotes(userId, limit);
  }

  async postNote(userId, parms) {
    let self = this;
    await self.dao.postNote(userId, parms.categoryId, parms.noteTitle, parms.content, parms.statusId, parms.noteType);
    return await self.dao.getNotes(userId, parms.categoryId);
  }

  async updateNote(userId, parms) {
    let self = this;
    await self.dao.updateNote(parms.noteId, parms.noteTitle, parms.content, parms.statusId, parms.categoryId);
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
    let insertId = await self.dao.postChecklistItem(parms.noteId, parms.label);
    return await self.dao.getChecklistItem(userId, insertId);
  }

  async updateChecklistItem(userId, parms) {
    let self = this;
    if(parms.active === undefined) parms.active = 1;
    await self.dao.updateChecklistItem(parms.id, parms.label, parms.isSelected, parms.active);
    //return await self.dao.getNotes(userId, parms.categoryId);
  }

  async deleteAllChecklistItems(userId, parms) {
    let self = this;
    await self.dao.deleteAllChecklistItems(parms.noteId);
    return [];
  }

}
module.exports = UI;
