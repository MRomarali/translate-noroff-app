
export function getAuth() {
    const auth = sessionStorage.getItem('auth');
    if (!auth) { return null; }

    return JSON.parse(auth);
}

export function setAuth(data) {
    return sessionStorage.setItem('auth', JSON.stringify(data)) || null;
}

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

export function setSessionTranslations(name, sequence) {
    const auth = sessionStorage.getItem('auth');
    let user = JSON.parse(auth);

    let translationsArray = [];
    for (let index = 0; index < user.translations.length; index++) {
        const translation = user.translations[index];
        translationsArray.push(translation);
    }
    translationsArray.push({ id: user.translations.length + 1, name, sequence }); // Add new translation;

    user = { id: user.id, username: user.username, translations: translationsArray };
    return sessionStorage.setItem('auth', JSON.stringify(user));
}
