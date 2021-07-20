export class CreateUserDto {
    username: string;
    fullName: string;
    email: string;
    password: string;
    isadmin?: boolean;
    role?: string;
}