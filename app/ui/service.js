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
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
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

}
module.exports = Service;
