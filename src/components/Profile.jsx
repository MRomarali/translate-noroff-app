import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { API_URL } from "../api/Index";
import { getAuth } from "../storage/Session";

export default function Profile() {
  useEffect(() => {
    let controller = new AbortController();
    const username = getAuth().username;
    (async () => {
      try {
        const response = await fetch(`${API_URL}/users?username=${username}`, {
          signal: controller.signal
        });
        setTranslations(await response.json().translations || [
          { "id": 1, "name": "One", "sequence": ["O", "N", "E"] },
          { "id": 2, "name": "Two", "sequence": ["T", "W", "O"] },
          { "id": 3, "name": "Three", "sequence": ["T", "H", "R", "E", "E"] },
          { "id": 4, "name": "Four", "sequence": ["F", "O", "U", "R"] },
          { "id": 5, "name": "Five", "sequence": ["F", "O", "U", "R"] },
          { "id": 6, "name": "Six", "sequence": ["F", "O", "U", "R"] },
          { "id": 7, "name": "Seven", "sequence": ["F", "O", "U", "R"] },
          { "id": 8, "name": "Eight", "sequence": ["F", "O", "U", "R"] },
          { "id": 9, "name": "Nine", "sequence": ["F", "O", "U", "R"] },
          { "id": 10, "name": "Ten", "sequence": ["T", "E", "N"] },
          { "id": 11, "name": "Eleven", "sequence": ["E", "L", "E", "V", "E", "N"] },
        ]);
        controller = null;
      } catch (error) {
        // Handle fetch error
      }
    })();
    return () => controller?.abort();
  }, []);

  const [translations, setTranslations] = useState([]);
  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; }
  // fetchUserProfileData();

  // function fetchUserProfileData(username) {
  //   let controller = new AbortController();
  //   username = 'John Doe';
  //   (async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/users?username=${username}`, {
  //         signal: controller.signal
  //       });
  //       setTranslations(await response.json().translations || [
  //         { "id": 1, "name": "One", "sequence": ["O", "N", "E"] },
  //         { "id": 2, "name": "Two", "sequence": ["T", "W", "O"] },
  //         { "id": 3, "name": "Three", "sequence": ["T", "H", "R", "E", "E"] },
  //         { "id": 4, "name": "Four", "sequence": ["F", "O", "U", "R"] },
  //         { "id": 5, "name": "Five", "sequence": ["F", "O", "U", "R"] },
  //         { "id": 6, "name": "Six", "sequence": ["F", "O", "U", "R"] },
  //         { "id": 7, "name": "Seven", "sequence": ["F", "O", "U", "R"] },
  //         { "id": 8, "name": "Eight", "sequence": ["F", "O", "U", "R"] },
  //         { "id": 9, "name": "Nine", "sequence": ["F", "O", "U", "R"] },
  //         { "id": 10, "name": "Ten", "sequence": ["T", "E", "N"] },
  //         { "id": 11, "name": "Eleven", "sequence": ["E", "L", "E", "V", "E", "N"] },
  //       ]);
  //       controller = null;
  //     } catch (error) {
  //       // Handle fetch error
  //     }
  //   })();
  //   return () => controller?.abort();
  //   // await fetch(`${API_URL}/users?username=${username}`, { signal: controller.signal })
  //   //   .then(response => response.json())
  //   //   .then(data => {
  //   //     setTranslations(data.translations || [
  //   //       {
  //   //         "id": 1,
  //   //         "name": "Hello there!",
  //   //         "sequence": ["h", "e", "l", "l", "o", "t", "h", "e", "r", "e"]
  //   //       },
  //   //       {
  //   //         "id": 2,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 3,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 4,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 5,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 6,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 7,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 8,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 9,
  //   //         "name": "How did I say Hi again?",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 10,
  //   //         "name": "Number 10",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 11,
  //   //         "name": "Number 11",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       },
  //   //       {
  //   //         "id": 12,
  //   //         "name": "Number 12",
  //   //         "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
  //   //       }
  //   //     ]);
  //   //   });
  // }

  return (
    <div className="page profile">
      <h1>Profile Page</h1>
      <div>
        {translations.map((translation, index) => {
          if (index >= 10) { return null; } // Return nothing if at number 10.
          return (
            <div className="translation" key={index}>
              <h2>English</h2>
              <p>{translation.name}</p>
              <h2>American Sign-Language</h2>
              <div className="imageSequence">
                {translation.sequence.map((char, key) => {
                  return (
                    <img
                      src={`American_SignLanguage_A-Z/${char}.png`}
                      alt={char}
                      key={key}
                      className="sign-language"
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
