import React from "react";
import { Container, Row, Col } from "reactstrap";
import AdminSideBar from "./AdminSideBar";
import LoanTableList from "./Loans";
import AgentTableList from "./Users";
import NavBar from "./Header";



class Admin extends React.Component {
    state = {
        user: {}
    }


    render() {

        return (
            <>
                <NavBar />
                <Container>
                    <Row>
                        <Col sm="3" className="">Admin Info
                            <div>
                                <h3>{this.state.user.name}</h3>
                                <p><span>{this.state.user.username}</span>{" "}<span><strong>Role:</strong>{this.state.user.role}</span></p>
                            </div>
                        </Col>
                        <Col sm="9" className="">Website Information
                         <div>
                             <LoanTableList />
                             <AgentTableList />
                         </div>
                        </Col>
                    </Row>
                </Container>


            </>
        );
    }
    componentDidMount = async () => {
        const userId = this.props.match.params.id
        console.log("UserID",userId)
        const resp = await fetch("http://localhost:3300/users/"+userId, {
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
    }

}

export default Admin;