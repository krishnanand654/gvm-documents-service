import dotenv from 'dotenv';
dotenv.config();

export interface User {
    id: string;
    username: string;
    password: string; 
  }
  

export const users: User[] = [
{
    id: "1",
    username: username: process.env.TEST_USERNAME as string,
    password: "testPass@123",
}
];
  
