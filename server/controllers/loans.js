// importing the Loan from models
import Loan from '../models/loans';

const loan = {
  // methodes will go here and you need to follow the same method
  async requestLoan(req, res) {
    await Loan.requestLoan(req.body)
      .then((loanRes) => {
        if (!loanRes) {
          res.status(400).send({
            status: 400,
            errorMessage: 'you have to provide all datas',
          });
        }
        res.status(200).send({
          status: 200,
          message: 'the loan request has already been sent',
          data: loanRes,
        });
      })
      .catch(err => err);
  },

  /**
 * User should be able to pay a loan
 *
 * @param {Object} req  request body object
 * @param {Array} res   response array
 */

  async payLoan(req, res) {
    const response = await Loan.payBackLoan(req.body);
    return res.status(200).send({
      status: res.statusCode,
      data: response,
    });
  },

  async approveLoan(req, res) {
    const loanApprove = await Loan.findLoan(req.params.id);
    try {
      if (!loanApprove || loanApprove.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'loan not found',
        });
      }

      const data = [
        req.body.loanStatus || loanApprove.rows[0].loanStatus,
        req.params.id,
      ];

      const appLoan = await Loan.approveLoan(data);
      return res.status(200).send({
        status: 200,
        data: appLoan,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: 'Error While updating',
      });
    }
  },
};
export default loan;
