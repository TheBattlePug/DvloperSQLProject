export interface Student {
    _id: number | null
    
    name: string;
    date_of_birth: string;
    gender: string;
    
    created_at: Date,
    updated_at: Date,
}