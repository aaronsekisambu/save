import db from '../config/db';
import queries from '../config/queries';

class User {
  static async createUser(data) {
    const { email, salt, hash } = data;
    try {
      const user = await db.pool.query(queries.createUser, [email, salt, hash]);
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
}

export default new User();
