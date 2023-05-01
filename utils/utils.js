export function persistUserData(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

export function getUserData(data) {
    return JSON.parse(localStorage.getItem("userData"));
}