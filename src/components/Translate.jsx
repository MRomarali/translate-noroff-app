import React from "react";
import { useState } from "react/cjs/react.development";

export default function Translate() {
  //const [auth, setAuth] = useState(sessionStorage.getItem('auth'));
  const [value, setValue] = useState('');
  const [imageSequence, setImageSequence] = useState([]);

  // setAuth(sessionStorage.getItem('auth'));

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = value.replaceAll(' ', ''); // Remove whitespaces
    // TODO: add number handling
    const tempArray = [];

    for (let index = 0; index < input.length; index++) {
      tempArray.push(input[index]);
    }
    
    setImageSequence(tempArray);
  }

  return (
    <div className="page translate">
      <h1>Translate Page</h1>
      <form onSubmit={handleSubmit}>
        <label>English</label>
        <input value={value} onChange={handleChange} placeholder="Hello there" />
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
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
