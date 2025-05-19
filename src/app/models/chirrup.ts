import { Timestamp } from "firebase/firestore";

export interface Chirrup {
    
    id?: string;
    userId: string;
    userEmail: string;
    text: string;
    creationTime: Timestamp;

    location?: {
        lat: number;
        lng: number;
    };
}
