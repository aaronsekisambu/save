import loanModel from '../models/loans';

const loan = {

  /**
   * User should be able to pay a loan
   * 
   * @param {Object} req  request body object
   * @param {Array} res   response array
   */

  async payLoan(req, res) {
    const response = await loanModel.payBackLoan(req.body);
    return res.status(200).send({
      status: res.statusCode,
      data: response
    });
  },


}

export default loan;