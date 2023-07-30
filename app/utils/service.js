'use strict'
const ServiceBase = require('service-base');
const ActivityCallback = require('workflow/activity-callback');
const RunProcess = require('workflow/run-process');
const RestartFailed = require('workflow/restart-failed');
const InstanceMeta = require('workflow/instance-meta');
const ProcessMeta = require('workflow/process-meta');
const GlobalMeta = require('workflow/global-meta');
const FileArrival = require('workflow/file-arrival');
/*
| -----------------------------------------------------------------------
|  Order Service
| -----------------------------------------------------------------------
*/
class Service extends ServiceBase {

  /*
  | -----------------------------------------------------------------------
  |  activityCallback
  | -----------------------------------------------------------------------
  */
  async activityCallback(req, res) {
    let self = this;

    let errs = self.common.validate(req, [
      { name: 'instanceId', type: 'body' },
      { name: 'statusCode', type: 'body' }
    ]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let ac = new ActivityCallback(self.app, self.name);
      let ret = await ac.doCallback(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error in activity callback for instanceId [" + req.body.instanceId + "] activity [" + req.body.activityName + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ instanceId: req.body.instanceId, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  runProcess
  | -----------------------------------------------------------------------
  */
  async runProcess(req, res) {
    let self = this;

    let errs = self.common.validate(req, [{ name: 'process', type: 'body' }]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let rp = new RunProcess(self.app, self.name);
      let ret = await rp.runProcess(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error in runProcess service for instanceId [" + req.body.process + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ processId: req.body.process, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  restartFailed
  | -----------------------------------------------------------------------
  */
  async restartFailed(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [{ name: 'instanceId', type: 'body' }]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let rf = new RestartFailed(self.app, self.name);
      let ret = await rf.restartFailed(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error in restartFailed service for instanceId [" + req.body.instanceId + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ instanceId: req.body.instanceId, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  postInstanceMeta
  | -----------------------------------------------------------------------
  */
  async postMeta(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [
      { name: 'instanceId', type: 'body' },
      { name: 'meta', type: 'body'}
    ]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let im = new InstanceMeta(self.app, self.name);
      let ret = await im.postMeta(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error posting meta data for instanceId [" + req.body.instanceId + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ instanceId: req.body.instanceId, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getInstanceMeta
  | -----------------------------------------------------------------------
  */
  async getMeta(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [{ name: 'instanceId', type: 'body' }]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let im = new InstanceMeta(self.app, self.name);
      let ret = await im.getMeta(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error getting meta data for instanceId [" + req.body.instanceId + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ instanceId: req.body.instanceId, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  postProcessMeta
  | -----------------------------------------------------------------------
  */
  async postProcessMeta(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [
      { name: 'process', type: 'body' },
      { name: 'meta', type: 'body'}
    ]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let pm = new ProcessMeta(self.app, self.name);
      let ret = await pm.postMeta(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error posting meta data for process [" + req.body.process + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ processId: req.body.process, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getProcessMeta
  | -----------------------------------------------------------------------
  */
  async getProcessMeta(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [{ name: 'process', type: 'body' }]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let pm = new ProcessMeta(self.app, self.name);
      let ret = await pm.getMeta(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error getting meta data for process [" + req.body.process + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ processId: req.body.process, errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  postGlobalMeta
  | -----------------------------------------------------------------------
  */
  async postGlobalMeta(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [
      { name: 'meta', type: 'body'}
    ]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let gm = new GlobalMeta(self.app, self.name);
      let ret = await gm.postMeta(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error posting global meta data : " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  getGlobalMeta
  | -----------------------------------------------------------------------
  */
  async getGlobalMeta(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, []);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let pm = new ProcessMeta(self.app, self.name);
      let ret = await pm.getMeta(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error getting global meta data : " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  fileArrival
  | -----------------------------------------------------------------------
  */
  async fileArrival(req, res) {
    let self = this;

    //Validate Request
    let errs = self.common.validate(req, [{ name: 'hostname', type: 'body' }]);
    if(errs) {
      res.status(400);
      return res.json({ errors: errs, confirmation: "false" });
    }
    try {
      let fa = new FileArrival(self.app, self.name);
      let ret = await fa.processFiles(req.body);
      res.json(ret);
    } catch(err) {
      res.status(500);
      let errMessage = "Error processing File Arrival for host [" + req.body.hostname + "] : " + err.toString();
      let ret = await self.errorHandler.logError({ errorMessage: errMessage, errorObject: err });
      res.json(ret);
    }
  }
}
module.exports = Service;
