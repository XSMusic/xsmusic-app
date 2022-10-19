import { User } from "@models";

export interface LoginResponseI {
    user: User;
    token: string;
}
