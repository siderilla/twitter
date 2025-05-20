import { Timestamp } from "firebase/firestore";

export interface User {

    nick: string;
    email: string;
    creationTime: Timestamp;
    lastLogin: Timestamp;

}
