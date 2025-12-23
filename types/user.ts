export interface UserData {
    readonly name: string;
    readonly phoneNumber: string;
    readonly location: string;
    readonly verified: boolean;
}

export interface PublicUserType {
    data: UserData;
    occupation: string | null;
}