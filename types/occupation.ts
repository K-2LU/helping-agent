export interface CreateOccupationDTO {
    name: string;
    details: string;
    createdBy: number;
}

export interface PublicOccupationType   {
    name: string;
    details: string | null;
}