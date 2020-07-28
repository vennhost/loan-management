import React from "react"
import NavBar from "./Header";
import Moment from "react-moment";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';

class UserLoan extends React.Component {
    state = {
        loan: {},
        user: {}
    }
    render() {
        const { loan } = this.state
        const { user } = this.state
        return (
            <>
                <NavBar />
                <div className="container">
                    <h4 className="title-text mb-5">Loan Details</h4>
                    <div className="row">
                        <div className="col">
        <p>Agent Name: </p><p>{user.name}</p>
                        </div>
                        <div className="col shadow-sm p-3 mb-5 bg-primary text-white rounded m-3">
                            <p>Name of Borrower: <h4>{loan.customerName}</h4></p>
                            <AccountBoxIcon />
                        </div>
                        <div className="col shadow-sm p-3 mb-5 bg-success text-white rounded m-3">
                            <p>Loan Amount: <h4>₦{loan.amount}</h4></p>
                            <LocalAtmIcon />
                        </div>
                        <div className="col shadow-sm p-3 mb-5 bg-warning text-white rounded m-3">
                            <p>Loan Tenure: <h4>{loan.loanTenure}{" "}Months</h4></p>
                            <ScheduleIcon />
                        </div>
                        <div className="col shadow-sm p-3 mb-5 bg-danger text-white rounded m-3">
                            <p>Loan Date: <h4><Moment
                                format="YYYY/MM/DD"
                                date={loan.createdAt}
                            /></h4></p>
                            <EventIcon />
                        </div>
                    </div>

                </div>
            </>
        );
    }

    componentDidMount = async () => {
        const loanId = this.props.match.params.id
        const resp = await fetch(`https://loan-be.herokuapp.com/loans/${loanId}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })

        const loan = await resp.json()
        console.log("user", loan)
        this.setState({
            loan: loan
        })

        /* users api */

        const userId = loan.user
        const response = await fetch(`https://loan-be.herokuapp.com/users/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        const user = await response.json()

        this.setState({
            user: user
        })
    }
}

export default UserLoan;