'use strict'
const Logger = require('utils/logger');
/*
| -----------------------------------------------------------------------
|  UI DAO
| -----------------------------------------------------------------------
*/
class UiDao {

  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(dbHelper) {
    let self = this;
    self.dbHelper = dbHelper;
    self.logger = new Logger('UI');
  }

  /*
  | -----------------------------------------------------------------------
  |  getFirstRow - helper to pull the first row
  | -----------------------------------------------------------------------
  */
  getFirstRow(rows) {
    let self = this;
    if(rows && rows.length > 0) {
      return rows[0];
    } else {
      return {};
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getCategories
  | -----------------------------------------------------------------------
  */
  async getCategories(userId) {
    let self = this;
    let sql = `select id, name, icon_class iconClass, default_ind defaultInd, bs_icon bsIcon, 
              description, hidden_ind hiddenInd, IFNULL(t.cnt, 0) cnt from user_category c
              LEFT JOIN (select category_id, count(0) as cnt from note n where user_id = ?
              group by category_id) t on (c.id = t.category_id)
              where c.user_id = ? AND delete_ind = 0 ORDER BY name `;
    let queryParams = [ userId, userId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

    /*
  | -----------------------------------------------------------------------
  |  postCategory
  | -----------------------------------------------------------------------
  */
  async postCategory(userId, name, icon, description, hiddenInd) {
    let self = this;
    let sql = ` INSERT INTO user_category (user_id, name, create_date, last_modify, bs_icon, description, hidden_ind)
                VALUES(?, ?, sysdate(), sysdate(), ?, ?, ?);`;
    let queryParams = [ userId, name, icon, description, hiddenInd ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  updateCategory
  | -----------------------------------------------------------------------
  */
  async updateCategory(categoryId, name, icon, description, hiddenInd) {
    let self = this;
    let sql = ` UPDATE user_category set last_modify = sysdate(), name = ?, bs_icon = ?, description = ?, hidden_ind = ?
                 where id = ?`;
    let queryParams = [ name, icon, description, hiddenInd, categoryId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteCategory
  | -----------------------------------------------------------------------
  */
  async deleteCategory(categoryId) {
    let self = this;
    let sql = ` UPDATE user_category set last_modify = sysdate(), delete_ind = 1 where id = ?`;
    let queryParams = [ categoryId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getNotes
  | -----------------------------------------------------------------------
  */
  async getNotes(userId, categoryId) {
    let self = this;
    let limit = 50;
    let sql = `select n.id, n.user_id userId, n.category_id categoryId, n.title, n.content,
             DATE_FORMAT(DATE_SUB(n.last_modify,INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") lastModify, n.flagged,
             DATE_FORMAT(DATE_SUB(n.create_date,INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") createDate, c.name category,
             CASE 
               WHEN ch.lastCheck is not null THEN DATE_FORMAT(ch.lastCheck, "%Y%m%d%H%i%S")
               WHEN n.last_modify is not null THEN DATE_FORMAT(n.last_modify, "%Y%m%d%H%i%S") 
               ELSE DATE_FORMAT(DATE_SUB(n.create_date,INTERVAL 1 HOUR), "%Y%m%d%H%i%S") END sortKey, s.id statusId, s.status, s.status_class statusClass,
             DATE_FORMAT(DATE_SUB(COALESCE(n.last_modify,n.create_date),INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") dispDate,
             COALESCE(s.bs_icon_class, 'bi-card-text') bsIconClass, n.note_type_id noteTypeId, t.note_type noteType,
             IFNULL(ch.checked, 0) checked, IFNULL(ch.total,0) total
             from note n
             LEFT JOIN user_category c on n.category_id = c.id
             LEFT JOIN note_status s on n.status_id = s.id
             LEFT JOIN note_type t on n.note_type_id = t.id
             LEFT JOIN (SELECT note_id, max(last_modify) lastCheck, sum(is_selected) checked, count(0) total FROM checklist_items WHERE active = 1 GROUP BY note_id) ch
               on n.id = ch.note_id
             where n.delete_ind = 0 and n.user_id = ? and n.category_id = ? order by sortKey desc LIMIT ?`;
    let queryParams = [ userId, categoryId, limit ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  async getRecentNotes(userId, limit) {
    let self = this;
    let sql = `select n.id, n.user_id userId, n.category_id categoryId, n.title, n.content,
            DATE_FORMAT(DATE_SUB(n.last_modify,INTERVAL 1 HOUR), "%m/%d/%Y  %h:%i:%S %p") lastModify, n.flagged,
            DATE_FORMAT(DATE_SUB(n.create_date,INTERVAL 1 HOUR), "%m/%d/%Y  %h:%i:%S %p") createDate, c.name category,
            CASE 
              WHEN ch.lastCheck is not null THEN DATE_FORMAT(ch.lastCheck, "%Y%m%d%H%i%S")
              WHEN n.last_modify is not null THEN DATE_FORMAT(n.last_modify, "%Y%m%d%H%i%S") 
              ELSE DATE_FORMAT(DATE_SUB(n.create_date,INTERVAL 1 HOUR), "%Y%m%d%H%i%S") END sortKey, s.id statusId, s.status, s.status_class statusClass,
            DATE_FORMAT(DATE_SUB(COALESCE(n.last_modify,n.create_date),INTERVAL 1 HOUR), "%m/%d/%Y  %h:%i:%S %p") dispDate,
            COALESCE(s.bs_icon_class, 'bi-card-text') bsIconClass, n.note_type_id noteTypeId, t.note_type noteType,
            IFNULL(ch.checked, 0) checked, IFNULL(ch.total,0) total, c.bs_icon categoryIcon
            from note n
            LEFT JOIN user_category c on n.category_id = c.id
            LEFT JOIN note_status s on n.status_id = s.id
            LEFT JOIN note_type t on n.note_type_id = t.id
            LEFT JOIN (SELECT note_id, max(last_modify) lastCheck, sum(is_selected) checked, count(0) total FROM checklist_items WHERE active = 1 GROUP BY note_id) ch
              on n.id = ch.note_id
            where n.delete_ind = 0 and n.user_id = ? order by sortKey desc LIMIT ?`;
    let queryParams = [ userId, limit ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }
  
  /*
  | -----------------------------------------------------------------------
  |  postNote
  | -----------------------------------------------------------------------
  */
  async postNote(userId, catId, title, content, statusId, noteType) {
    let self = this;
    let sql = ` INSERT INTO note (user_id, category_id, title, content, create_date, status_id, note_type_id)
                values(?,?,?,?,sysdate(),?, (SELECT id from note_type WHERE note_type = ?))`;
    let queryParams = [ userId, catId, title, content, statusId, noteType ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  updateNote
  | -----------------------------------------------------------------------
  */
  async updateNote(noteId, title, content, status, categoryId) {
    let self = this;
    let sql = ` UPDATE note set last_modify = sysdate(), title = ?, content = ?, status_id = ?, category_id = ?
                 where id = ?`;
    let queryParams = [ title, content, status, categoryId, noteId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteNote
  | -----------------------------------------------------------------------
  */
  async deleteNote(noteId) {
    let self = this;
    let sql = ` UPDATE note set last_modify = sysdate(), delete_ind = 1 where id = ?`;
    let queryParams = [ noteId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getUser
  | -----------------------------------------------------------------------
  */
  async getUser(email, pw) {
    let self = this;
    let em = email.trim().toLowerCase();
    let sql = `SELECT id, name, hide_completed_notes hideCompletedNotes,
                 show_upd_confetti showUpdConfetti, show_check_confetti showCheckConfetti 
               FROM user where email = ? and auth = ? and active = 1`;
    let queryParams = [ em, pw ];
    let data = await self.dbHelper.executeSqlAwait(sql, queryParams);
    return self.getFirstRow(data);
  }

  /*
  | -----------------------------------------------------------------------
  |  updateUser
  | -----------------------------------------------------------------------
  */
  async updateUser(id, hideCompletedNotes, showUpdConfetti, showCheckConfetti) {
    let self = this;
    let sql = ` UPDATE user set last_modify = sysdate(), hide_completed_notes = ?, 
                 show_upd_confetti = ?, show_check_confetti = ?
                 where id = ?`;
    let queryParams = [ hideCompletedNotes, showUpdConfetti, showCheckConfetti, id ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getUserById
  | -----------------------------------------------------------------------
  */
  async getUserById(id) {
    let self = this;
    let sql = `SELECT id, name, hide_completed_notes hideCompletedNotes,
                 show_upd_confetti showUpdConfetti, show_check_confetti showCheckConfetti 
               FROM user where id = ? and active = 1`;
    let queryParams = [ id ];
    let data = await self.dbHelper.executeSqlAwait(sql, queryParams);
    return self.getFirstRow(data);
  }

  /*
  | -----------------------------------------------------------------------
  |  createUser
  | -----------------------------------------------------------------------
  */
  async createUser(name, email, pw) {
    let self = this;
    let em = email.trim().toLowerCase();
    let sql = `INSERT INTO user (name,auth,email,create_date,active) VALUES (?,?,?,SYSDATE(),1)`;
    let queryParams = [ name, pw, em ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getStatusOpts
  | -----------------------------------------------------------------------
  */
  async getStatusOpts(userId) {
    let self = this;
    let sql = `SELECT id, status, bs_icon_class FROM note_status WHERE active = 1 order by id`;
    let queryParams = [ ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getChecklistItems
  | -----------------------------------------------------------------------
  */
  async getChecklistItems(userId, noteId) {
    let self = this;
    let sql = `SELECT c.id, c.note_id noteId, c.label, c.is_selected isSelected, 
               DATE_FORMAT(DATE_SUB(c.last_modify,INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") lastModify
               FROM checklist_items c
               LEFT JOIN note n on c.note_id = n.id
               WHERE c.active = 1 AND n.user_id = ? AND note_id = ?
               ORDER BY c.is_selected, c.label`;
    let queryParams = [userId, noteId];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getChecklistItem
  | -----------------------------------------------------------------------
  */
  async getChecklistItem(userId, itemId) {
    let self = this;
    let sql = `SELECT c.id, c.note_id noteId, c.label, c.is_selected isSelected, 
               DATE_FORMAT(DATE_SUB(c.last_modify,INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") lastModify
               FROM checklist_items c
               LEFT JOIN note n on c.note_id = n.id
               WHERE c.active = 1 AND n.user_id = ? AND c.id = ?
               ORDER BY c.is_selected, c.label`;
    let queryParams = [userId, itemId];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  postChecklistItem
  | -----------------------------------------------------------------------
  */
  async postChecklistItem(noteId, label) {
    let self = this;
    let lab = label.trim();
    let sql = `INSERT INTO checklist_items (note_id, label, create_date, is_selected, last_modify)
               VALUES (?, ?, sysdate(), 0, sysdate())`;
    let queryParams = [ noteId, lab ];
    let data = await self.dbHelper.executeSqlAwait(sql, queryParams);
    return data.insertId;
  }

  /*
  | -----------------------------------------------------------------------
  |  updateChecklistItem
  | -----------------------------------------------------------------------
  */
  async updateChecklistItem(id, label, isSelected, active) {
    let self = this;
    let lab = label.trim();
    let sql = `UPDATE checklist_items 
               SET label = ?, is_selected = ?, last_modify = sysdate(), 
               toggle_date = sysdate(), active = ?
               WHERE id = ?`;
    let queryParams = [ lab, isSelected, active, id ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteAllChecklistItems
  | -----------------------------------------------------------------------
  */
  async deleteAllChecklistItems(noteId) {
    let self = this;
    let sql = `UPDATE checklist_items 
               SET active = 0, last_modify = sysdate()
               WHERE note_id = ?`;
    let queryParams = [ noteId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }
}

module.exports = UiDao;

