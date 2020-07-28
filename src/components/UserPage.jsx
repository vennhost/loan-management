import React from "react";
import { Container, Row, Col } from "reactstrap";
import AdminSideBar from "./AdminSideBar";
import LoanTableList from "./Loans";
import AgentTableList from "./Users";
import NavBar from "./Header";
import UserLoanTableList from "./AgentLoans";
import { Table, Button } from 'reactstrap';
import { Spinner } from 'reactstrap';
import Moment from "react-moment";
import { Alert } from 'reactstrap';
import CreateLoan from "./CreateLoan";




class Admin extends React.Component {
    state = {
        user: {},
        loans: [],
        offset: 0,
        perPage: 5,
        currentPage: 0,
        isDeleteAlert: false,
        isOpen: true,
        isLoading: true
    }


    render() {

        

        return (
            <>
                <NavBar />
                <Container>
                    <Row>
                        <Col sm="3" className=""><h2 className="title-text">User Info</h2>
                            <div>
                                <h3 className="item-text">{this.state.user.name}</h3>
                                <p><span className="item-text">{this.state.user.username}</span>{" "}</p>
                                <p className="item-text"><strong>Role: </strong>{this.state.user.role}</p>
                                 <div><span className="item-text">Commission: </span><span>₦{this.state.user.commission}</span></div>
                                 <div><span className="item-text">Last Deposit: </span><span>₦{this.state.user.deposit}</span></div>
                                 <div><span className="item-text">Transanctions: </span><span>₦{0}</span></div>
                                 <div><span className="item-text">Balance: </span><span>₦{this.state.user.commission + this.state.user.deposit}</span></div>
                            </div>
                            <div>
                                <Button className="item-text" onClick={() => this.handleLoan()} className="btn">Create Loan</Button>
                            </div>
                        </Col>
                        <Col sm="9" className="">Transanctions Information
                         <div>
                                <div><h3 className="mr-auto title-text">Loans</h3></div>
                                {this.state.isDeleteAlert ? <Alert color="success">Item was Deleted successfully</Alert> : <div></div>}
                                <Table striped size="sm" responsive>
                                    <thead >
                                        <tr>
                                            <th>Date</th>
                                            <th>Customer Name</th>
                                            <th>User</th>
                                            <th>Amount</th>
                                            <th>Tenure</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.isLoading ? <Spinner style={{ justifyContent: "center" }} color="primary" /> :
                                                this.state.loans.map((loan, key) =>
                                                    <tr key={loan._id}>
                                                        <th scope="row">
                                                            <Moment
                                                                format="YYYY/MM/DD"
                                                                date={loan.createdAt}
                                                            />
                                                        </th>
                                                        <td onClick={() => { }}>{loan.customerName}</td>
                                                        <td>{loan.user}</td>
                                                        <td>{loan.amount}</td>
                                                        <td>{loan.loanTenure}</td>
                                                        <td>{loan.loanStatus}</td>
                                                        <td><Button color="primary" size="sm" onClick={() => { if (window.confirm('Delete this loan?')) this.handleDelete(loan._id) }}>Delete</Button>{' '}
                                                            <Button color="secondary" size="sm" onClick={() => this.handleEdit(loan._id)}>Edit</Button></td>
                                                    </tr>
                                                )}

                                    </tbody>
                                </Table>

                            </div>
                        </Col>
                    </Row>
                </Container>


            </>
        );
    }
    componentDidMount = async () => {
        const userId = this.props.match.params.id
        console.log("UserID", userId)
        const resp = await fetch("http://localhost:3300/users/" + userId, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        console.log("Response", resp)
        const user = await resp.json()
        console.log("user", user)
        this.setState({
            user: user
        })

        console.log(this.state.user.name)

        /*  ----------------- */

        const response = await fetch(`https://loan-be.herokuapp.com/loans/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            }
        })
        console.log("Loan Response:", response)
        //console.log(await resp.json())
        const loans = await response.json()
        console.log(loans)
        this.setState({
            loans: loans,
            isLoading: false
        })
    }

    handleLoan = () => {
            
        this.props.history.push("/createloan/"+this.state.user._id)
    }

}

export default Admin;