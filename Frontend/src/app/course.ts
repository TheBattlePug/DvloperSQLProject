export interface Course {
    _id: number | null

    name: string;
    capacity: number;

    created_at: Date;
    updated_at: Date;
}