import db from '../config/db';
import queries from '../config/queries';

class User {
  async createUser(data) {
    const { email, salt, hash } = data;
    try {
      const user = await db.pool.query(queries.createUser, [email, salt, hash]);
      return user;
    } catch (error) {
      return error;
    }
  }


  static async getUser(email) {
    try {
      const user = await db.pool.query(queries.getUserByEmail, [email]);
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
  	try{
  		return await db.executeQuery(queries.approveUser, [this.id]);
  	} catch (error) {
  		return error;
  	}
  }

<<<<<<< HEAD
  async getUserDetails(id) {
=======
  async getDetails(id) {
>>>>>>> [ft-164832221] add user details API
    try{
      return await db.executeQuery(queries.getUser, [id]);
    } catch (error) {
      return error;
    }
  }
<<<<<<< HEAD

  async getUserLoans(id) {
    try{
      return await db.executeQuery(queries.getUserLoans, [id]);
    } catch (error) {
      return error;
    }
  }

  async getUserTransactions(id) {
    try{
      return await db.executeQuery(queries.getUserTransactions, [id]);
    } catch (error) {
      return error;
    }
  }
=======
>>>>>>> [ft-164832221] add user details API
}

export default new User();
