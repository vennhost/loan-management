import React, { Component } from "react";
//import { Grid, Row, Col, Table } from "react-bootstrap";
import { Table, Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Moment from "react-moment";
import { Link, Redirect } from "react-router-dom";
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';

//import { useHistory } from 'react-router-dom';

//import Card from "components/Card/Card.jsx";


import CreateLoan from "./CreateLoan";

class LoanTableList extends Component {
  state = {
    loans: [],
    offset: 0,
    perPage: 5,
    currentPage: 0,
    isDeleteAlert: false,
    isOpen: true,
    isLoading: true,
    redirect: null
  }

  onDismiss = () => {
    this.setState({isOpen: false})
  }
  
  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
  }

    //const history = useHistory()
    return (
      <div className="content">
        <div><h3 className="mr-auto">Loans</h3><CreateLoan/></div>
       {this.state.isDeleteAlert ? <Alert color="success">Item was Deleted successfully</Alert> : <div></div>}
        <Table striped size="sm" responsive>
      <thead>
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
        this.state.isLoading ? <Spinner style={{ justifyContent:"center" }} color="primary" /> : 
        this.state.loans.map((loan, key) => 
          
          <tr key={loan._id} onClick={() => this.setState({redirect: `/loan/${loan._id}`})}>
          <th scope="row">
            <Moment
            format="YYYY/MM/DD"
            date={loan.createdAt}
            />
            </th>
          <td onClick={() => {}}>{loan.customerName}</td>
          <td>{loan.user}</td>
          <td>{loan.amount}</td>
          <td>{loan.loanTenure}</td>
          <td>{loan.loanStatus}</td>
          <td><Button color="primary" size="sm" onClick={() => {if(window.confirm('Delete this loan?'))this.handleDelete(loan._id)}}>Delete</Button>{' '}
              <Button color="secondary" size="sm" onClick={() => this.handleEdit(loan._id)}>Edit</Button></td>
        </tr>
        )}
        
      </tbody>
    </Table>
      </div>
    );
  }

  componentDidMount = async () => {

  

    const resp = await fetch("http://localhost:3300/loans", {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    }
    })
    console.log(resp)
    //console.log(await resp.json())
    const loans = await resp.json()
      console.log(loans)
    this.setState({
      loans: loans,
      isLoading: false
    })


  }



  handleDelete = async (loan_id) => {

    const loans = [...this.state.loans]
    const remainLoans = loans.filter(item => item._id != loan_id)
    
    const resp = await fetch(`http://localhost:3300/loans/${loan_id}`, {
      method: 'DELETE'
    })
    //alert("Deleted Successfully")
    this.setState({
      loans: [...remainLoans],
      isDeleteAlert: true
    })
  
    
  }

  handleEdit = async (id) => {

    const loans = [...this.state.loans]
    const loanToApprove = loans.filter(item => item._id != id)
    const resp = await fetch(`http://localhost:3300/loans/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const loanStatus = this.state.loan.loanStatus

    alert("Edited!")
  }

}

export default LoanTableList;
