export interface UserAccount {
    _id: number | null
    
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirm: string;
}