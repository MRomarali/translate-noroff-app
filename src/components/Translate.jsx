import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { apiPostTranslationsRequest } from "../api/Index";
import { getAuth, setSessionTranslations } from "../storage/Session";

/**
 * Translation page where English input will be translated
 * to American Sign-Language in form of images.
 * @returns 
 */
export default function Translate() {
  const [value, setValue] = useState("");
  const [imageSequence, setImageSequence] = useState([]);
  const [disabled, setDisabled] = useState(false);
  
  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; } // Reroute if not authenticated.

  /**
   * Update value state whenever input element recieves new input.
   * @param {Event} event 
   */
  /**
   * Update whenever input element recieves new input.
   * Set button to enabled & trim input to match only alphabetical characters and whitespace.
   * @param {Event} event 
   */
  const handleChange = (event) => {
    setDisabled(false); // Enable button
    const regExp = /[^A-Za-z\s]/g;
    setValue(event.target.value.replaceAll(regExp, "")); // Trim input from invalid characters
  }

  /**
   * Split the word into letters in an array to display each 
   * image in a sequence using the letter + .png to find the resource.
   * Send latest translation to sessionStorage & API.
   * 
   * If no input has been made prompt user with an alert to 
   * enter a word before submitting. (One character is accepted!).
   * @param {Event} event 
   * @returns 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true); // Disable button to avoid multiple submits.
    const regExp = /[^A-Za-z]/g;
    const input = value.replaceAll(regExp, ""); // Remove any non-alphabetical character.
    if(input < 1) { // If input is less than 1 prompt user with an alert. (Excludes whitespace).
      alert('Please enter a word before submitting.');
      return;
    }

    const tempArray = []; // Temporary array to hold image sequance letters.
    for (let index = 0; index < input.length; index++) {
      tempArray.push(input[index].toUpperCase()); // set to uppercase before sending to sessionStorage & API.
    }

    setImageSequence(tempArray); // State
    apiPostTranslationsRequest(getAuth().id, input, tempArray); // API
    setSessionTranslations(value, tempArray); // Session
  }

  return (
    <div className="page translate">
      <form onSubmit={handleSubmit}>
        <label>English</label>
        <input value={value} onChange={handleChange} placeholder="Hello..." />
        <label>American Sign-Language</label>
        <div>
          {/* Iterate over image sequence array & set each character to an image from resources */}
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
