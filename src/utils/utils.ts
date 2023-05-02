import { UserData } from "@/src/types/types";

export function persistUserData(data: UserData) {
    localStorage.setItem("userData", JSON.stringify(data));
}

export function getUserData(): UserData | undefined {
    const data = localStorage.getItem("userData");
    if(data){
        return JSON.parse(data);
    }
    return undefined;
}

export function clearUserData() {
    return localStorage.removeItem("userData");
}