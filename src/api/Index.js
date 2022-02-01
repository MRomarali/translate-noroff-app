import { setAuth } from "../storage/Session";

export const API_URL = "https://my-json-server.typicode.com/OmarAbdiAli/translate-noroff-app";

export async function apiPostUserLoginRequest(value) {
    await fetch(`${API_URL}/users?username=${value}`)
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
