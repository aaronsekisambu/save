// import will go here
import transcat  from '../models/transactions';

// the class for the transaction

const transaction = {
    // methodes will go here and you need to follow the same method
     async save (req, res) {
         const saver = await transcat.saveMoney()
    }
}

export default transaction;