import { Timestamp } from "firebase/firestore";

export interface Cinguettio {
    
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
