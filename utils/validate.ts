const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);

export const isValidPassword = (passw: string) => PASSWORD_REGEX.test(passw);
