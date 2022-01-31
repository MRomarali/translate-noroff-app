import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "./Index";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitButtonText: 'Login',
      // auth: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO: make better code
    // Login user
    if (this.state.submitButtonText === 'Login') { // TODO: Change to flag!
      fetch(`${API_URL}/users?username=${this.state.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            alert(`${this.state.value} was found in database!`);
            // this.setState({ auth: data });
            sessionStorage.setItem('auth', data); // Temporary fix
            return <Navigate to="/profile" />;
          } else {
            alert(`${this.state.value} was not found in database!`);
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
        });
    }
  }

  render() {
    return (
      <div className="page login">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Username</label>
          <input value={this.state.value} onChange={this.handleChange} placeholder="John Doe..." />
          <button type="submit">{this.state.submitButtonText}</button>
        </form>
      </div>
    );
  }
}
