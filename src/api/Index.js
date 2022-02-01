import { setAuth } from "../storage/Session";

export const API_URL = "https://my-json-server.typicode.com/OmarAbdiAli/translate-noroff-app";//"https://translate-noroff-app.herokuapp.com/api";

export async function apiPostUserLoginRequest(value) {
    console.log(API_URL);
    await fetch(`${API_URL}/users/?username=${value}`)
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
            setAuth(data);
            return data;
        });
}

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

export async function apiGetTranslations(id, numberOfTranslations = -1) {
    const response = await fetch(`${API_URL}/users/?id=${id}/translations`);
    const data = await response.json();

    console.log(data);
    // Return custom amount of items
    if (numberOfTranslations > -1) {
        return data.slice(numberOfTranslations, data.length);
    }
    return data.slice(0, data.length); // Return only 10 items
}
