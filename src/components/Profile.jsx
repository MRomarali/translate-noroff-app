import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, getSessionTranslations } from "../storage/Session";

/**
 * User profile page where previous translations are displayed.
 * @returns 
 */
export default function Profile() {
  useEffect(() => {
    let controller = new AbortController(); // Cancel all current async/await calls to avoid memory leaks.
    (async () => {
      try {
        // Set state Translations from sessionStorage with the 10 latest translations
        // & order them in reverse. Latest at the top of page.
        setTranslations(getSessionTranslations(10).reverse());
        controller = null; // If async complete set to null.
      } catch (error) {
        // Handle error
      }
    })();
    return () => controller?.abort(); // If controller is not null, abort any async/await calls.
  }, []);

  const [translations, setTranslations] = useState([]);
  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; } // Reroute if not authenticated.

  return (
    <div className="page profile">
      <h1>Profile Page</h1>
      <div>
        {/* Iterate over translations in state (from sessionStorage) & display them */}
        {translations.length > 0 ? translations.map((translation, index) => {
          return (
            <div className="translation" key={index}>
              <p className="id">{translation.id}</p>
              <h2>English</h2>
              <p>{translation.name}</p>
              <h2>American Sign-Language</h2>
              <div className="imageSequence">
                {/* Iterate over image sequances in state (from sessionStorage) & display them */}
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
            {/* If no translations are found display this message box instead */}
            <div className="translation">
              <h2>You do not have any translations yet.</h2>
              <br />
              {/* Link to Translation page. */}
              <a href="/">Link: Visit the Translation page and start to translate.</a>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
