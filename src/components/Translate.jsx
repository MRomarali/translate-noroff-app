import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { apiPostTranslationsRequest } from "../api/Index";
import { getAuth, setSessionTranslations } from "../storage/Session";

export default function Translate() {
  const [value, setValue] = useState("");
  const [imageSequence, setImageSequence] = useState([]);
  const [disabled, setDisabled] = useState(false);
  
  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; }

  const handleChange = (event) => {
    setDisabled(false);
    const regExp = /[^A-Za-z\s]/g;
    setValue(event.target.value.replaceAll(regExp, "")); // Trim input from invalid characters
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    const regExp = /[^A-Za-z]/g;
    const input = value.replaceAll(regExp, "");
    if(input < 1) {
      alert('Please enter a word before submitting.');
      return;
    }

    const tempArray = [];
    for (let index = 0; index < input.length; index++) {
      tempArray.push(input[index].toUpperCase()); // set to uppercase before sending to sessionStorage & API.
    }

    setImageSequence(tempArray);
    apiPostTranslationsRequest(getAuth().id, input, tempArray);
    setSessionTranslations(value, tempArray);
  }

  return (
    <div className="page translate">
      <form onSubmit={handleSubmit}>
        <label>English</label>
        <input value={value} onChange={handleChange} placeholder="Hello..." />
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
