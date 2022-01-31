
export function getAuth() {
    return JSON.parse(sessionStorage.getItem('auth'))[0];
}

export function setAuth(data) {
    return sessionStorage.setItem('auth', JSON.stringify(data))
}
