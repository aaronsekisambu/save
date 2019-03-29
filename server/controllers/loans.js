// importing the Loan from models
import Loan from '../models/loans';

// the class for the loan

const loan = {
    // methodes will go here and you need to follow the same method
  async requestLoan (req, res) {
		const newLoan = await Loan.requestLoan(req.body)
			.then((loan) => {
				if(!loan) {
					return res.status(400).send({
						status: 400,
						errorMessage: 'you have to provide all datas',
					})
				}
				res.status(200).send({
					status: 200,
					message: 'the loan request has already been sent',
					data: loan,
				})			
			})
			.catch(err => console.log(err));
	},

	async approveLoan(req, res) {
		const loan = await Loan.findLoan(req.params.id);
		try {
			if (!loan || loan.rows.length === 0) {
				return res.status(404).send({
					status: 404,
					message: 'loan not found',
				});
			}
	
			const data = [
				req.body.loanStatus || loan.rows[0].loanStatus,
				req.params.id
			];
	
			const appLoan = await Loan.approveLoan(data);
			return res.status(200).send({
				status: 200,
				data: appLoan,
			});
		} catch (error) {
			return res.status(500).send({
				status: 500,
				message: 'Error While updating',
			});
		}
	}
}

export default loan;