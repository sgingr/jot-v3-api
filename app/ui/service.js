'use strict'
const ServiceBase = require('service-base');
const UI = require('ui/ui');
const User = require('ui/user');

/*
| -----------------------------------------------------------------------
|  Order Service
| -----------------------------------------------------------------------
*/
class Service extends ServiceBase {

  /*
  | -----------------------------------------------------------------------
  |  getCategories
  | -----------------------------------------------------------------------
  */
  async getCategories(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      //{ name: 'user', type: 'query' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.getCategories(req.user.userId);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error getting Categories" + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  postCategory
  | -----------------------------------------------------------------------
  */
  async postCategory(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'name', type: 'body' },
      { name: 'icon', type: 'body' },
      { name: 'description', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.postCategory(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error posting new category " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  updateCategory
  | -----------------------------------------------------------------------
  */
  async updateCategory(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'categoryId', type: 'body' },
      { name: 'name', type: 'body' },
      { name: 'icon', type: 'body' },
      { name: 'hiddenInd', type: 'body' },
      //{ name: 'description', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.updateCategory(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error updating category " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteNote
  | -----------------------------------------------------------------------
  */
  async deleteCategory(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'categoryId', type: 'query' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.deleteCategory(req.user.userId, req.query);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error deleting category " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getNotes
  | -----------------------------------------------------------------------
  */
  async getNotes(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      //{ name: 'user', type: 'query' },
      { name: 'category', type: 'query' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.getNotes(req.user.userId, req.query);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error getting Notes " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  postNote
  | -----------------------------------------------------------------------
  */
  async postNote(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      //{ name: 'user', type: 'query' },
      { name: 'categoryId', type: 'body' },
      { name: 'noteTitle', type: 'body' },
      { name: 'content', type: 'body' },
      { name: 'statusId', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.postNote(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error posting new note " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  updateNote
  | -----------------------------------------------------------------------
  */
  async updateNote(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      //{ name: 'user', type: 'query' },
      { name: 'categoryId', type: 'body' },
      { name: 'noteId', type: 'body' },
      { name: 'noteTitle', type: 'body' },
      { name: 'content', type: 'body' },
      { name: 'statusId', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.updateNote(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error updating note " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteNote
  | -----------------------------------------------------------------------
  */
  async deleteNote(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      //{ name: 'user', type: 'query' },
      { name: 'noteId', type: 'query' },
      { name: 'categoryId', type: 'query' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.deleteNote(req.user.userId, req.query);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error deleting note " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  login
  | -----------------------------------------------------------------------
  */
  async login(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'email', type: 'body' },
      { name: 'password', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let user = new User(self.app, self.name);
      let ret = await user.login(req.body);
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 200, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        sameSite: 'None',
        secure: true,
      }
      //res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
      //res.header("Access-Control-Allow-Credentials", true);
      res.cookie("session", ret.token, options);
      res.json(ret);
    } catch (err) {
      res.status(401);
      let errMessage = "Error logging in " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  register
  | -----------------------------------------------------------------------
  */
  async register(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'name', type: 'body' },
      { name: 'email', type: 'body' },
      { name: 'password', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let user = new User(self.app, self.name);
      let ret = await user.register(req.body);
      res.json(ret);
    } catch (err) {
      res.status(401);
      let errMessage = "Error registering user " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getStatusOpts
  | -----------------------------------------------------------------------
  */
  async getStatusOpts(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      //{ name: 'user', type: 'query' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.getStatusOpts(req.user.userId);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error getting Status list " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getUser
  | -----------------------------------------------------------------------
  */
  async getUser(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'id', type: 'params' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let user = new User(self.app, self.name);
      let ret = await user.getUser(req.params);
      res.json(ret);
    } catch (err) {
      res.status(401);
      let errMessage = "Error getting user " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  updateUser
  | -----------------------------------------------------------------------
  */
  async updateUser(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'id', type: 'params' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let user = new User(self.app, self.name);
      let ret = await user.updateUser(req.body);
      res.json(ret);
    } catch (err) {
      res.status(401);
      let errMessage = "Error getting user " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

    /*
  | -----------------------------------------------------------------------
  |  getChecklistItems
  | -----------------------------------------------------------------------
  */
  async getChecklistItems(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'note', type: 'query' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.getChecklistItems(req.user.userId, req.query);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error getting checklistItems " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  postChecklistItem
  | -----------------------------------------------------------------------
  */
  async postChecklistItem(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'noteId', type: 'body' },
      { name: 'label', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.postChecklistItem(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error posting new checklistItem " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  updateChecklistItem
  | -----------------------------------------------------------------------
  */
  async updateChecklistItem(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'id', type: 'body' },
      { name: 'label', type: 'body' },
      { name: 'isSelected', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.updateChecklistItem(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error updating checklistItem " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteAllChecklistItems
  | -----------------------------------------------------------------------
  */
  async deleteAllChecklistItems(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'noteId', type: 'body' },
    ]);
    if (errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ui = new UI(self.app, self.name);
      let ret = await ui.deleteAllChecklistItems(req.user.userId, req.body);
      res.json(ret);
    } catch (err) {
      res.status(500);
      let errMessage = "Error deleting all checklist items " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

}
module.exports = Service;
