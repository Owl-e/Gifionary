import { User } from "./user.model";

export interface Message {
    user: User;
    message: string;
}