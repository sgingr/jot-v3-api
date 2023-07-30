'use strict';
const path = require('path');
/*
| -----------------------------------------------------------------------
|  Common Utilities
| -----------------------------------------------------------------------
*/
class Common {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(app) {
    let self = this;
    self.app = app;
  }

  /*
  | -----------------------------------------------------------------------
  |  isNone
  | -----------------------------------------------------------------------
  */
  isNone(val) {
    return(val === undefined || val === null);
  }

  /*
  | -----------------------------------------------------------------------
  |  Validate parms
  | -----------------------------------------------------------------------
  */
  validate(req, parms) {
    let self = this;
    let errs = [];
    parms.forEach((parm) => {
      let value = req[parm.type][parm.name];
      if(parm.validateFunc) {
        let msg = parm.validateFunc(parm.type, parm.name, value);
        if(msg) {
          errs.push(msg);
        }
      } else if(value === undefined || value === null) {
        if(parm.message) {
          errs.push(parm.message);
        } else {
          errs.push("Missing or empty [" + parm.type + "] parameter [" + parm.name + "]");
        }
      }
    });
    return (errs.length >0) ? errs : null;
  }

  /*
  | -----------------------------------------------------------------------
  |  findBy
  | -----------------------------------------------------------------------
  */
  findBy(arr, key, value) {
    let matches = arr.filter((item) => {
      return item[key] == value;
    });
    return matches[0];
  }

  /*
  | -----------------------------------------------------------------------
  |  filterBy
  | -----------------------------------------------------------------------
  */
  filterBy(arr, key, value) {
    return arr.filter((item) => {
      return item[key] == value;
    });
  }

  /*
  | -----------------------------------------------------------------------
  |  toInt
  | -----------------------------------------------------------------------
  */
  toInt(str) {
    let ret = 0;
    if(str && /[^\D]/.test(str)) {
      let intVal = parseInt(str);
      ret = (intVal) ? intVal : 0;
    }
    return ret;
  }

  /*
  | -----------------------------------------------------------------------
  |  asyncForEach
  | -----------------------------------------------------------------------
  */
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  joinDirLinux - running dev instances on windows is annoying
  | -----------------------------------------------------------------------
  */
  joinDirLinux(...args) {
    return path.join(...args).replace(/\\/g, "\/");
  }

  /*
  | -----------------------------------------------------------------------
  |  stringGlobToRegex - Beware - only handles single strings, not a directory
  | -----------------------------------------------------------------------
  */
  stringGlobToRegex(str) {
    let escs = ['/','$','^','+','.','(',')','=','!','|'];
    let ret = str;
    escs.forEach((esc) => {
      ret = ret.split(esc).join("\\" + esc);
    });
    ret = ret.replace(/\*/g, ".*");
    return ret;
  }
}

module.exports = Common;
