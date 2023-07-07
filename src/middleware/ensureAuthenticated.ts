import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from "../configs/auth";

interface IPayload {
    sub: string;
}

const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    
    if (!authHeader) {
        return response.status(401).json('JWT não informado')
    }
        
    const [, token] = authHeader.split(' ');
    
    try {
        const sub = verify(token, authConfig.jwt.secret) as any;
        request.user = JSON.parse(sub.user)        
        return next();

    } catch (error) {
        return response.status(401).json('JWT Token invalido')
    }
};

export { ensureAuthenticated };