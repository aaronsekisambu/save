import db from '../config/db';
import queries from '../config/queries';

class User {
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
