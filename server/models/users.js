import db from '../config/db';
import queries from '../config/queries';

class User {
  async deleteUser(data) {
    const { id } = data;
    try {
      const { rows, row } = await db.executeQuery(queries.deleteUser, [id]);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default new User();
