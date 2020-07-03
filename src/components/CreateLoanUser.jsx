import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container } from "@material-ui/core";


class CreateLoanUser extends React.Component {
    state = {
        
        customerName: "",
        gender: "",
        amount: "",
        loanTenure: "",
        user: this.props.match.params.id
        
    }

    
    render() {

        this.handleChange = (event) => {
            console.log(event.target.value)
            this.setState({ [event.target.name]: event.target.value })
        }

        const { customerName, gender, amount, loanTenure, user } = this.state
        return (
            <>
            <Container>
                <Button onClick={() => this.handleBack()}>Go Back</Button>
                <div><h3>Loan Application Form</h3></div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="customerName">Name</Label>
                        <Input type="text" name="customerName" id="customerName" placeholder="customer name" value={customerName} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input type="text" name="gender" id="gender" placeholder="gender" value={gender} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input type="number" name="amount" id="amount" placeholder="amount" value={amount} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="loanTenure" sm={2}>Loan Tenure</Label>
                        <Col sm={10}>
                            <Input type="number" name="loanTenure" id="loanTenure" placeholder="loan tenure in months" value={loanTenure} onChange={this.handleChange}/>
                                
                            
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="user">User</Label>
                        <Input
                            type="text"
                            name="user"
                            id="user"
                            placeholder="user id"
                            value={user}
                            /* onChange={this.handleChange} */
                        />
                    </FormGroup>
                    
                    <Button>Submit</Button>
                </Form>
                </Container>
            </>
        );
    }

    handleBack = () => {
        
    }

    handleSubmit = async (e, name, username, password, role, deposit, commission) => {
        e.preventDefault()

        console.log("state", this.state)

        const response = await fetch("http://localhost:3300/loans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)

        })
        
        
        const data = await response.json()
            console.log("data", data)
            JSON.stringify(this.state)

            this.setState({ customerName: '', gender: '', amount: '', loanTenure: '', user: '' })
            this.props.history.push("/user/"+this.props.match.params.id)

    }

    

}

export default CreateLoanUser;