import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, getSessionTranslations } from "../storage/Session";

export default function Profile() {
  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        setTranslations(getSessionTranslations(10).reverse());
        controller = null;
      } catch (error) {

      }
    })();
    return () => controller?.abort();
  }, []);

  const [translations, setTranslations] = useState([]);
  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; }

  return (
    <div className="page profile">
      <h1>Profile Page</h1>
      <div>
        {translations.length > 0 ? translations.map((translation, index) => {
          // if (index >= 10) { return null; } // Return nothing if at number 10.
          return (
            <div className="translation" key={index}>
              <p className="id">{translation.id}</p>
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
        })
          :
          <div>
            <div className="translation">
              <h2>You do not have any translations yet.</h2>
              <br />
              <a href="/">Link: Visit the Translation page and start to translate.</a>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
