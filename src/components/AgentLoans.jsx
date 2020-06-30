import React, { Component } from "react";
//import { Grid, Row, Col, Table } from "react-bootstrap";
import { Table, Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';

//import { useHistory } from 'react-router-dom';

//import Card from "components/Card/Card.jsx";


import CreateLoan from "./CreateLoan";

class UserLoanTableList extends Component {
  state = {
    loans: [],
    offset: 0,
    perPage: 5,
    currentPage: 0,
    isDeleteAlert: false,
    isOpen: true,
    isLoading: true
  }

  onDismiss = () => {
    this.setState({isOpen: false})
  }
  
  render() {

    //const history = useHistory()
    return (
      <div className="content">
        <div><h3 className="mr-auto">Loans</h3><CreateLoan/></div>
       {this.state.isDeleteAlert ? <Alert color="success">Item was Deleted successfully</Alert> : <div></div>}
        
      </div>
    );
  }

  componentDidMount = async () => {

    const resp = await fetch(`http://localhost:3300/loans/${userId}`, {
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

  handleEdit = () => {
    alert("Edited!")
  }

}

export default UserLoanTableList;
