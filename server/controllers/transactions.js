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
        console.log(save);
        return res.status(200).send({
          status: res.statusCode,
          data: save,
        });
      })
      .catch(error => console.log(error));
  },
  async updateSaving(req, res) {
    const checkAdmin = req.user.isadmin;
    if (checkAdmin === false) {
      res.status(401).send({
        status: 401,
        message: 'Admin Access is required to approve the loan',
      });
    }
    const updated = req.params.id;
    await transcat.approveSaving(updated)
      .then((update) => {
        if (!update) {
          res.status(400).send({
            status: res.statusCode,
            errorMessage: 'Please which user details to update',
          });
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
