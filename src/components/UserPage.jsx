import React from "react";
import { Container, Row, Col } from "reactstrap";


class UserPage extends React.Component {
    state = {}
    render() {
        return ( 
            <>
                <Container>
                    <Row>
                       
                            <Col xs="6" sm="4">Profile Picture</Col>
                            <Col xs="6" sm="4">Profile Info</Col>
                            <Col sm="4">Transanctions</Col>

                        </Row>
                </Container>
           </>
         );
    }
}
 
export default UserPage;