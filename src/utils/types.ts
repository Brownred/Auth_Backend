export interface signUpDetails {
    fullName: string;
    email: string;
    password: string;
    dob: Date;
    gneder: 'Male' | 'Female';
    Country?: string;
}