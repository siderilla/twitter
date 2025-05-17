export interface Chirrup {
    
    id?: string;
    userId: string;
    userEmail: string;
    text: string;
    createdAt: Date;

    location?: {
        lat: number;
        lng: number;
    };
}
