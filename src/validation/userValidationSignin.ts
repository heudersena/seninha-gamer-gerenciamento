import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


const userValidationSignin = async (request: Request, response: Response, next: NextFunction) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        // @ts-ignore
        return request.status(400).json({ errors: errors.array() });
    }

    next()
}

export { userValidationSignin }