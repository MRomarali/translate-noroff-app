import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../api/Index";
import { getAuth, setAuth } from "../storage/Session";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitButtonText: 'Login',
      auth: getAuth() || null, // If nothing is set to null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.auth) { return; } // Exit if already authenticated.
    if (this.state.value < 1) { return; } // Return if no input is made (or if only whitespace).

    // TODO: make better code
    // Login user
    if (this.state.submitButtonText === 'Login') { // TODO: Change to flag!
      fetch(`${API_URL}/users?username=${this.state.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            console.log(`${this.state.value} was found in database!`);
            setAuth(data); // Temporary fix
            this.setState({ auth: data });
          } else {
            console.log(`${this.state.value} was not found in database!`);
            this.setState({ submitButtonText: 'Create' });
          }
        });
      // Create user
    } else {
      fetch(`${API_URL}/users/`, {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ submitButtonText: 'Login' });
          this.setState({ auth: data });
        });
    }
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
              <button type="submit">{this.state.submitButtonText}</button>
            </form>
        }
      </div>
    );
  }
}
