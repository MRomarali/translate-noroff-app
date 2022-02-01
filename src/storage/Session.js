
export function getAuth() {
    const auth = sessionStorage.getItem('auth');
    if (!auth) { return null; }

    return JSON.parse(auth);
}

export function setAuth(data) {
    return sessionStorage.setItem('auth', JSON.stringify(data)) || null;
}
