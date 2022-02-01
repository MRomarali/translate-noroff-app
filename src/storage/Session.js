
/**
 * Helper function to get auth(user) from session storage.
 * @returns auth
 */
export function getAuth() {
    const auth = sessionStorage.getItem('auth');
    if (!auth) { return null; }

    return JSON.parse(auth);
}

/**
 * Helper function to set auth(user) to session storage.
 * @returns {void}
 */
export function setAuth(data) {
    return sessionStorage.setItem('auth', JSON.stringify(data)) || null;
}

/**
 * Get translations from session storage via auth(user).
 * Slice the returned array from storage into an array of your desired length. i.e 10 Translations.
 * @param {Number} length number of values you wish to fetch.
 * @returns translations
 */
export function getSessionTranslations(length = -1) {
    const auth = sessionStorage.getItem('auth');
    if (!auth) { return []; }
    let translations = JSON.parse(auth).translations;
    if (length === -1) { return translations; }

    let startSlice = translations.length - length; // Start at length - desired length (i.e 10);
    if (startSlice < 0) { startSlice *= -1; }
    translations = translations.slice(startSlice, translations.length); // Get first half of slice.

    return translations;
}

/**
 * Set translations to session storage, auth(user).
 * In this instance, since translations are stored within auth we need to 
 * iterate over the object returned from auth and add it to an temporary array,
 * which we can then add our latest translation to at the end.
 * 
 * Finally we can add everything back to an object which we can send to 
 * session storage again, with updated values.
 * @param {String} name input value (raw string).
 * @param {String[]} sequence array of letters.
 * @returns {void}
 */
export function setSessionTranslations(name, sequence) {
    const auth = sessionStorage.getItem('auth');
    let user = JSON.parse(auth);

    let translationsArray = [];
    for (let index = 0; index < user.translations.length; index++) {
        const translation = user.translations[index];
        translationsArray.push(translation);
    }
    translationsArray.push({ id: user.translations.length + 1, name, sequence }); // Add new translation

    user = { id: user.id, username: user.username, translations: translationsArray };
    return sessionStorage.setItem('auth', JSON.stringify(user));
}
