import argon2 from 'argon2';
import jwt from 'jsonwebtoken'
import { User,users } from '../Models/User';

import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

class AuthService{
    async login(username:string, password:string){
        
        const user = users.find((user)=> user.username === username);
        if(!user){
            throw new Error('User not found');
        }

        const validatePassword = await argon2.verify(user.password, password)
        if(!validatePassword){
            throw new Error('Invalid password');
        }

        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: "1h"});
        return {token, userId: user.id};
    }
}

export default new AuthService;