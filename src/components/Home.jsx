import React, { component } from "react";
import Header from "./Header";
import { Container, Row, Col, Card, CardBody, Jumbotron } from "reactstrap";
import Login from "./Login";
//import "../../src/index.css"


class Home extends React.Component {
    state = {
       
    }
    render() {
        return (
            <>
                {/* <Header /> */}
                <Container className="frontBody">
                    <Row>
                        <Col sm="5">
                            <Jumbotron>
                            <div className="home-text shadow p-3 mb-5 bg-white rounded">
                                <h3>Welcome</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat.
                                </p>
                            </div>
                            </Jumbotron>
                        </Col>
                        <Col sm="5">
                            <Jumbotron className="home-login">
                            <h3>
                                <u className="form-head">Login</u>
                            </h3>
                            <hr />
                            <Card>
                                <CardBody>
                                    <Login />
                                </CardBody>
                            </Card>
                        </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;