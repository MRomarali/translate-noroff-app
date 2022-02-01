import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { apiPostTranslationsRequest } from "../api/Index";
import { getAuth, setSessionTranslations } from "../storage/Session";

export default function Translate() {
  const initialState = {
    value: ""
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        console.log(action)
        return {
          ...state,
          value: action
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [value, setValue] = useState(() => { return ""; });
  const [imageSequence, setImageSequence] = useState(() => { return []; });
  const [disabled, setDisabled] = useState(() => { return false; });

  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; }

  const handleChange = (event) => {
    setDisabled(false);
    const regExp = /[^A-Za-z\s]/g;
    dispatch({
      state: event.target.value.replaceAll(regExp, ""),
      type: 'INPUT'
    }); // Trim input from invalid characters
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    const regExp = /[^A-Za-z]/g;
    console.log(state)
    let input = state.value.state;
    input = input.replaceAll(regExp, "");
    if (input < 1) {
      alert('Please enter a word before submitting.');
      return;
    }

    const tempArray = [];
    for (let index = 0; index < input.length; index++) {
      tempArray.push(input[index]);
    }

    setImageSequence(tempArray);
    apiPostTranslationsRequest(getAuth().id, input, tempArray);
    setSessionTranslations(input, tempArray);
  }

  return (
    <div className="page translate">
      <form onSubmit={handleSubmit}>
        <label>English</label>
        <input value={state.state} onChange={handleChange} placeholder="Hello..." />
        <label>American Sign-Language</label>
        <div>
          {imageSequence.map((char, index) => {
            return <img
              src={`American_SignLanguage_A-Z/${char.toUpperCase()}.png`}
              alt={char.toUpperCase()}
              key={index}
              className="sign-language"
            />
          })}
        </div>
        <button type="submit" disabled={disabled} className={disabled ? "disabled" : ""}>Send</button>
      </form>
    </div>
  );
}
