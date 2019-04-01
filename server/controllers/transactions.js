// import will go here
import transcat from '../models/transactions';

// the class for the transaction

const Transaction = {
  // methods will go here and you need to follow the same method
  async save(req, res) {
    const saved = req.body;
    await transcat.saveMoney(saved)
      .then((save) => {
        if (!save) {
          res.status(400).send({
            status: res.statusCode,
            data: [{
              error: 'Some values are missing',
            }],
          });
        }
        return res.status(200).send({
          status: res.statusCode,
          data: [{
            save,
          }],
        });
      })
      .catch(error => console.log(error));
  },
  async updateSaving(req, res) {
    const updated = req.params.id;
    await transcat.approveSaving(updated)
      .then((update) => {
        if (!update) {
          res.status(400).send({
            status: res.statusCode,
            errorMessage: 'Please which user details to update',
          })
        }
        return res.status(200).send({
          status: res.statusCode,
          data: [{
            update,
          }],
        });
      });
  },
};

export default Transaction;
