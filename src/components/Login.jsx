import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { apiPostUserLoginRequest } from "../api/Index";
import { getAuth } from "../storage/Session";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      auth: getAuth(), // If nothing is set to null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.auth) { return this.redirect(); } // Exit if already authenticated.
    if (this.state.value < 1) { return this.redirect(); } // Return if no input is made (or if only whitespace).

    // Login user
    console.log(this.state.value);
    await apiPostUserLoginRequest(this.state.value);
    this.setState({ auth: getAuth() });
  }

  redirect() {
    return(<Navigate to="/" />)
  }

  render() {
    return (
      <div className="page login">
        {
          this.state.auth ?
            // Go to Profile page when authenticated.
            <Navigate to="/" />
            :
            // Show form if no user is authenticated.
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="">Username</label>
              <input value={this.state.value} onChange={this.handleChange} placeholder="John Doe..." />
              <button type="submit">Login</button>
            </form>
        }
      </div>
    );
  }
}
