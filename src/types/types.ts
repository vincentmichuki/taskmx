export interface UserData{
    username: String;
    token: String;
    userid: Number
}

export interface LoginFormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

export interface LoginForm extends HTMLFormElement {
    readonly elements: LoginFormElements;
}

export interface RegisterFormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
}

export interface RegisterForm extends HTMLFormElement {
    readonly elements: RegisterFormElements;
}

export interface CreateTicketFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    description: HTMLInputElement;
    assigned_user: HTMLInputElement;
    user: HTMLInputElement;
    ticket_type: HTMLInputElement,
    notes: HTMLInputElement
}

export interface CreateTicketForm extends HTMLFormElement {
    readonly elements: CreateTicketFormElements;
}

interface User{
    username: String;
}

export interface Ticket{
    id: Number;
    title: String;
    description: String;
    status: String;
    ticket_type: String;
    created: String;
    assigned_user: String;
}
