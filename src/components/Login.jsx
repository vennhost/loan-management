import React from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link, Redirect } from "react-router-dom"
//import { api_login } from "../../../apis/users"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      login: false,
      token: null,
      store: null,
      isAuthenticated: false,
      redirect: null
    };
  }

  handleValidSubmit = async (event, username, password) => {
    event.preventDefault();


        const response = await fetch("https://loan-be.herokuapp.com/users/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(username, password),
         
       })
       const result = await response.json();
 
       console.log(result)
       
       localStorage.setItem('login', JSON.stringify({
             login: true,
             token: result.access_token
           }))
           console.log("My Token", localStorage.login)

           if (result.user.role === "admin") {
            this.setState({
                redirect: `/admin/${result.user._id}`,
                isAuthenticated: true
            })
           } else {
          this.setState({
              redirect: `/user/${result.user._id}`,
              isAuthenticated: true
          })
        }
       


  };

  
  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ username: values.username, error: true });
    console.log(`Login failed`);
  };

  render() {

    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }


    return (
        <>
     { this.state.isAuthenticated ? <div>"Loggedin"</div> :
        
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
          
        <AvField
          name="username"
          label="Email"
          type="text"
          validate={{
            required: true,
            email: true
          }}
        />
        <AvField
          name="password"
          label="Password"
          type="password"
          validate={{
            required: {
              value: true,
              errorMessage: "Please enter your password"
            },
            pattern: {
              value: "^[A-Za-z0-9]+$",
              errorMessage:
                "Your password must be composed only with letter and numbers"
            },
            minLength: {
              value: 6,
              errorMessage: "Your password must be between 6 and 16 characters"
            },
            maxLength: {
              value: 16,
              errorMessage: "Your password must be between 6 and 16 characters"
            }
          }}
        />
        <Button id="submit">Submit</Button>
      </AvForm>
     }

     </>
    );
  }
}


export default LoginForm;
