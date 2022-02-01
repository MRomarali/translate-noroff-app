import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { apiPostUserLoginRequest } from "../api/Index";
import { getAuth } from "../storage/Session";

/**
 * Simple login page to guard routes against unwanted users.
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', // Input value from form.
      auth: getAuth(), // If nothing is set to null
    };

    // Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Update value state whenever input element recieves new input.
   * @param {Event} event 
   */
  handleChange(event) {
    this.setState({ value: event.target.value }); // Update value state.
  }

  /**
   * Send API request to log in user & if no user already exists create a new on.
   * Set auth state to currently logged in / created user.
   * @param {Event} event 
   * @returns 
   */
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.auth) { return this.redirect(); } // Exit if already authenticated.
    if (this.state.value < 1) { return this.redirect(); } // Return if no input is made (or if only whitespace).

    // Login user
    await apiPostUserLoginRequest(this.state.value); // API
    this.setState({ auth: getAuth() }); // State
  }

  /**
   * Helper function to avoid repeating the same redirect route in html.
   * @returns Navigate to "/" path (history).
   */
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
