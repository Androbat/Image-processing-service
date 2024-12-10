import bcrypt from "bcrypt";




export function isJson(payload: object): boolean {
    return typeof payload === 'object' ? true : false;
}


export function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export async function hashPassword(password: string, salt: number): Promise<string> { 
    return bcrypt.hash(password, salt);
}

export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  };

// PAY ATTENTION TO THIS FUNCTION
export function mustNotContainOnDefinedValues(reqBody: Express.Request){
    return Object.values(reqBody).some((value) => typeof value === "undefined");
}

export function isValidMinPasswordChars(password: string): boolean {
    const sanatizedPassword = password.trim()
    return sanatizedPassword.length < 8 ? false : true;
}


