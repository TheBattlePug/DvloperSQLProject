import { Schema, model } from 'mongoose';

export interface UserAccount {
    firstname: string;
    lastname: string;
    email: string;
    uuid?: string | undefined;
    password: string;
    passwordConfirm: string;
}

const UserAccountSchema = new Schema<UserAccount>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    uuid: { type: String, required: true },
    password: { type: String, required: true },
    passwordConfirm: { type: String, required: true },
});

export const UserAccountModel = model<UserAccount>('UserAccount', UserAccountSchema);