import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Register extends React.Component {
    state = {
        
        name: "",
        username: "",
        password: "",
        role: "",
        deposit: "",
        commission: ""
        
    }

    
    render() {

        this.handleChange = (event) => {
            console.log(event.target.value)
            this.setState({ [event.target.name]: event.target.value })
        }

        const { name, username, password, role, deposit, commission } = this.state
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="name" value={name} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Email</Label>
                        <Input type="email" name="username" id="username" placeholder="username" value={username} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password" value={password} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={2}>User Role</Label>
                        <Col sm={10}>
                            <Input type="text" name="role" id="exampleSelect" placeholder="user role" value={role} onChange={this.handleChange}/>
                                
                            
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="deposit">Deposit</Label>
                        <Input
                            type="number"
                            name="deposit"
                            id="deposit"
                            placeholder="deposit"
                            value={deposit}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="commission">Commission</Label>
                        <Input
                            type="number"
                            name="commission"
                            id="commission"
                            placeholder="deposit"
                            value={commission}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </>
        );
    }

    handleSubmit = async (e, name, username, password, role, deposit, commission) => {
        e.preventDefault()

        console.log("state", this.state)

        const response = await fetch("http://localhost:3300/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)

        })
        
        
        const data = await response.json()
            console.log("data", data)
        localStorage.setItem('login', JSON.stringify({
            login: true,
            token: data.access_token
          }))

    }

}

export default Register;