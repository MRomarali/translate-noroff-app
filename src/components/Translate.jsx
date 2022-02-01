import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import { apiPostTranslationsRequest } from "../api/Index";
import { getAuth, setSessionTranslations } from "../storage/Session";

export default function Translate() {
  const initialState = {
    value: "",
    sequence: [],
    disabled: false,
  };

  const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          value: action
        };
      case "DISABLE":
        return {
          ...state,
          disabled: action
        };
      case "SEQUENCE":
        return {
          ...state,
          sequence: action
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [value, setValue] = useState(() => { return ""; });
  // const [imageSequence, setImageSequence] = useState(() => { return []; });
  // const [disabled, setDisabled] = useState(() => { return false; });

  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; }

  const handleChange = (event) => {
    // setDisabled(false);
    dispatch({
      disabled: false,
      type: 'DISABLE'
    });
    const regExp = /[^A-Za-z\s]/g;
    dispatch({
      value: event.target.value.replaceAll(regExp, ""),
      type: 'INPUT'
    }); // Trim input from invalid characters
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // setDisabled(true);
    dispatch({
      disabled: true,
      type: 'DISABLE'
    });
    const regExp = /[^A-Za-z]/g;
    const input = state.value.value.replaceAll(regExp, "");
    if (input < 1) {
      alert('Please enter a word before submitting.');
      return;
    }

    const tempArray = [];
    for (let index = 0; index < input.length; index++) {
      tempArray.push(input[index]);
    }

    // setImageSequence(tempArray);
    dispatch({
      sequence: tempArray,
      type: 'SEQUENCE'
    });
    apiPostTranslationsRequest(getAuth().id, input, tempArray);
    setSessionTranslations(input, tempArray);
  }

  return (
    <div className="page translate">
      <form value={state.value.value} onSubmit={handleSubmit}>
        <label>English</label>
        <input onChange={handleChange} placeholder="Hello..." />
        <label>American Sign-Language</label>
        <div>
          {/*{imageSequence.map((char, index) => {*/}
          {state.sequence.sequence ? state.sequence.sequence.map((char, index) => {
            return <img
              src={`American_SignLanguage_A-Z/${char.toUpperCase()}.png`}
              alt={char.toUpperCase()}
              key={index}
              className="sign-language"
            />
          }) : console.log(state.sequence.sequence)}
        </div>
        <button type="submit" disabled={state.disabled.disabled} className={state.disabled.disabled ? "disabled" : ""}>Send</button>
      </form>
    </div>
  );
}
