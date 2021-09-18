import { User } from "./user.model";

export interface Room {
    id?: string;
    users: User[];
}