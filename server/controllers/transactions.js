// import will go here
import transcat  from '../models/transactions';

// the class for the transaction

const Transaction = {
    // methodes will go here and you need to follow the same method
     async save (req, res) {
         const saver = await transcat.saveMoney(req.body);
         console.log(saver);
         saver.then((save) => {
            if(!save){
                return res.status(400).send({
                    status: 400,
                    data: [{
                        message: "Testing saves"
                    }]
                })
            }
         })
         .catch(error => console.log(error));
    }
}

export default Transaction;