import bcrypt from "bcrypt";

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function hashPassword(password: string, salt: number): Promise<string> { 
    return bcrypt.hash(password, salt);
}