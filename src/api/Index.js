import { setAuth } from "../storage/Session";

/**
 * API URL to fetch and send data to.
 */
export const API_URL = "https://my-json-server.typicode.com/OmarAbdiAli/translate-noroff-app";
// export const API_URL = "https://translate-noroff-app.herokuapp.com/api";

/**
 * Fetch users from API url & if user exists log in as that user.
 * Otherwise create a new user with apiPostUserCreateRequest(value).
 * And update session storage to current user.
 * @param {String} value username
 */
export async function apiPostUserLoginRequest(value) {
    await fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                console.log(`${value} was found in database!`);
                const user = data[0];
                setAuth(user);
                return user;
            } else {
                console.log(`${value} was not found in database!`);
                return apiPostUserCreateRequest(value);
            }
        });
}

/**
 * Create a new user in the API.
 * And update session storage to current user.
 * @param {String} value 
 */
export async function apiPostUserCreateRequest(value) {
    await fetch(`${API_URL}/users/`, {
        method: 'POST',
        body: JSON.stringify({
            username: value,
            translations: [],
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setAuth(data); // Set sessionStorage.
            return data;
        });
}

/**
 * Send API request to add new Translations under user, id.
 * @param {Number} id 
 * @param {String} name 
 * @param {String[]} sequence 
 */
export async function apiPostTranslationsRequest(id, name, sequence) {
    await fetch(`${API_URL}/users/?id=${id}/translations`, {
        method: 'POST',
        body: JSON.stringify({
            translations: { name, sequence },
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Fetch translations from user, id in API.
 * @param {Number} id 
 * @param {Number} numberOfTranslations 
 * @returns translations
 */
export async function apiGetTranslations(id, numberOfTranslations = -1) {
    const response = await fetch(`${API_URL}/users/?id=${id}/translations`);
    const data = await response.json();

    // Return custom amount of items
    if (numberOfTranslations > -1) {
        return data.slice(numberOfTranslations, data.length);
    }
    return data.slice(0, data.length); // Return only 10 items
}
