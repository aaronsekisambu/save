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

  static async userLogin(email) {
    try {
      const user = await db.pool.query(queries.getUser, [email]);
      return user;
    } catch (error) {
      return error;
    }
  }
}

export default User;
