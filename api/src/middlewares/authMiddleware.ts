import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    userId: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = verify(token, 'jjhggffrrtredddfgghjjkkkjj') as TokenPayload;

        req.body.userId = decodedToken.userId;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Falha na autenticação: token inválido' });
    }
};
