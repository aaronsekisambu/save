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
				}
}

export default loan;