import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const comparePasswords = (hash: string, password: string): Promise<boolean> => bcrypt.compare(password,hash);
