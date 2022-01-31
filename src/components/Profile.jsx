import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { API_URL } from "./Index";

export default function Profile() {
  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const [translations, setTranslations] = useState([]);

  const auth = sessionStorage.getItem('auth');
  if (!auth) { return <Navigate to="/login" />; }

  async function fetchUserProfileData(username) {
    username = 'John Doe';
    await fetch(`${API_URL}/users?username=${username}`)
      .then(response => response.json())
      .then(data => {
        setTranslations(data.translations || [
          {
            "id": 1,
            "name": "Hello there!",
            "sequence": ["h", "e", "l", "l", "o", "t", "h", "e", "r", "e"]
          },
          {
            "id": 2,
            "name": "How did I say Hi again?",
            "sequence": ["h", "o", "w", "d", "i", "d", "i", "s", "a", "y", "h", "i", "a", "g", "a", "i", "n"]
          }
        ]);
      });
  }

  return (
    <div className="page profile">
      <h1>Profile Page</h1>
      <div>
        {translations.map((translation, index) => {
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
