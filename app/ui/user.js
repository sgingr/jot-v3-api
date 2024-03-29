'use strict'
const UiBase = require('ui/ui-base');
const EncryptionHelper = require('utils/encryption-helper');
const jwt = require('jsonwebtoken');

/*
| -----------------------------------------------------------------------
|  User
| -----------------------------------------------------------------------
*/
class User extends UiBase {

  /*
  | -----------------------------------------------------------------------
  |  login
  | -----------------------------------------------------------------------
  */
  async login(parms) {
    let self = this;

    let enc = new EncryptionHelper();

    try {
      let pw = enc.encryptText(parms.password);
      let user = await self.dao.getUser(parms.email, pw);

      if (!user || !user.id) {
        throw ('Unauthorized');
      }

      let token = jwt.sign({ userId: user.id, userName: user.name }, process.env.TOKEN_KEY);
      return ({ user: user, token: token });

    } catch (err) {
      throw (err);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  register
  | -----------------------------------------------------------------------
  */
  async register(parms) {
    let self = this;

    let enc = new EncryptionHelper();
    try {
      let pw = enc.encryptText(parms.password);
      await self.dao.createUser(parms.name, parms.email, pw);
      return { status: 1, message: "New user [parms.name] created" };
    } catch (err) {
      throw (err);
    }

  }

  /*
  | -----------------------------------------------------------------------
  |  getUser
  | -----------------------------------------------------------------------
  */
  async getUser(parms) {
    let self = this;

    try {
      let user = await self.dao.getUserById(parms.id);
      return user;
    } catch (err) {
      throw (err);
    }
  }

  /*
  | -----------------------------------------------------------------------
  |  updateUser
  | -----------------------------------------------------------------------
  */
  async updateUser(parms) {
    let self = this;
    console.log("updating user with:");
    console.log(parms);
    await self.dao.updateUser(parms.id, parms.hideCompletedNotes, parms.showUpdConfetti, parms.showCheckConfetti);
    return await self.dao.getUserById(parms.id);
  }
}

module.exports = User;
