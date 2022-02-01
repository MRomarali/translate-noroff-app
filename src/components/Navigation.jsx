import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Simple navigation bar for routing user around the website.
 * @returns 
 */
export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Translate</NavLink>
        </li>
        <li>
          <NavLink to="/Profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}
