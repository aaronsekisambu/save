import db from '../config/db';
import queries from '../config/queries';

class User {
  static async createUser(data) {
    const { email, salt, hash } = data;
    try {
      const user = await db.executeQuery(queries.createUser, [email, salt, hash]);
      return user;
    } catch (error) {
      return error;
    }
  }


  static async getUser(email) {
    try {
      const user = await db.executeQuery(queries.getUserByEmail, [email]);
      return user;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(data) {
    this.id = data.id;
    try {
      return await db.executeQuery(queries.deleteUser, [this.id]);
    } catch (error) {
      return error;
    }
  }

  async approveUser(data) {
    this.id = data.id;
    try {
      return await db.executeQuery(queries.approveUser, [this.id]);
    } catch (error) {
      return error;
    }
  }
}

export default new User();
