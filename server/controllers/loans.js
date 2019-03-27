import joi from 'joi';
import uuid from 'uuid/v4';
import moment from 'moment';

const loan = {

    /**
     * User should be able to pay a loan
     */
    async payLoan(req, res) {
        return res.status(200).send({
            status: res.statusCode,
            data: ['Hello Guy']
        });
    }
}

export default loan;