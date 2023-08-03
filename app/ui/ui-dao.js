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
    let sql = `select id, name, icon_class iconClass, default_ind defaultInd, bs_icon bsIcon, IFNULL(t.cnt, 0) cnt from user_category c
              LEFT JOIN (select category_id, count(0) as cnt from note n where user_id = ?
              group by category_id) t on (c.id = t.category_id)
              where c.user_id = ? ORDER BY name `;
    let queryParams = [ userId, userId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  getProcessActivities
  | -----------------------------------------------------------------------
  */
  async getNotes(userId, categoryId) {
    let self = this;
    let sql = `select n.id, n.user_id userId, n.category_id categoryId, n.title, n.content,
             DATE_FORMAT(DATE_SUB(n.last_modify,INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") lastModify, n.flagged,
             DATE_FORMAT(DATE_SUB(n.create_date,INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") createDate, c.name category,
             CASE WHEN n.last_modify is not null THEN DATE_FORMAT(n.last_modify, \"%Y%m%d%H%i%S\") ELSE
             DATE_FORMAT(DATE_SUB(n.create_date,INTERVAL 1 HOUR), \"%Y%m%d%H%i%S\") END sortKey, s.id statusId, s.status, s.status_class statusClass,
             DATE_FORMAT(DATE_SUB(COALESCE(n.last_modify,n.create_date),INTERVAL 1 HOUR), \"%m/%d/%Y  %h:%i:%S %p\") dispDate,
             COALESCE(s.bs_icon_class, 'bi-card-text') bsIconClass
             from note n
             LEFT JOIN user_category c on n.category_id = c.id
             LEFT JOIN note_status s on n.status_id = s.id
             where delete_ind = 0 and n.user_id = ? and n.category_id = ? order by sortKey desc`;
    let queryParams = [ userId, categoryId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }
  
  /*
  | -----------------------------------------------------------------------
  |  postNote
  | -----------------------------------------------------------------------
  */
  async postNote(userId, catId, title, content, statusId) {
    let self = this;
    let sql = ` INSERT INTO note (user_id, category_id, title, content, create_date, status_id)
                values(?,?,?,?,sysdate(),?)`;
    let queryParams = [ userId, catId, title, content, statusId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  updateNote
  | -----------------------------------------------------------------------
  */
  async updateNote(noteId, title, content, status) {
    let self = this;
    let sql = ` UPDATE note set last_modify = sysdate(), title = ?, content = ?, status_id = ?
                 where id = ?`;
    let queryParams = [ title, content, status, noteId ];
    return await self.dbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteNote
  | -----------------------------------------------------------------------
  */
  async deleteNote(noteId) {
    let self = this;
    let sql = ` UPDATE note set last_modify = sysdate(), delete_ind = 0 where id = ?`;
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
    let sql = `SELECT id, name FROM user where email = ? and auth = ? and active = 1`;
    let queryParams = [ em, pw ];
    let data = await self.dbHelper.executeSqlAwait(sql, queryParams);
    return self.getFirstRow(data);
  }

  /*
  | -----------------------------------------------------------------------
  |  getUserById
  | -----------------------------------------------------------------------
  */
  async getUserById(id) {
    let self = this;
    let sql = `SELECT id, name FROM user where id = ? and active = 1`;
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
}

module.exports = UiDao;
