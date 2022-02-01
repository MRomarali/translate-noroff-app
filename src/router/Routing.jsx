import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from '../components/Login';
import Navigation from "../components/Navigation";
import Profile from '../components/Profile';
import Translate from '../components/Translate';

export default function Routing() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Translate />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
