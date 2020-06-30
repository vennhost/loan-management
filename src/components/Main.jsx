import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import UserPage from "./UserPage";
import Users from "./Users";
import Loans from "./Loans";
import UserLoan from "./UserLoan";



class Main extends React.Component {
    state = {}
    render() {
        return (
            <>
                <Router>
                    <Route path="/admin/:id" component={Admin} />
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/users/" component={Users} />
                    <Route path="/loan/:id" component={UserLoan} />
                    <Route path="/loans" component={Loans} />
                    
                    <Route path="/" exact component={Home} />
                    
                </Router>
            </>
        );
    }
}

export default Main;