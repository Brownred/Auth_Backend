export interface signUpDetails {
    name: string;
    email: string;
    password: string;
    dob: Date;
    gender: 'Male' | 'Female';
    country?: string;
}