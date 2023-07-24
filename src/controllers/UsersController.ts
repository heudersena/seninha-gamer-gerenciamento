import { Request, Response } from "express";

import { UsersEntities } from "../database/query/UsersEntities"

class UsersController {
    static async signIn(request: Request, response: Response) {
        const { email, password } = request.body;

        const returns = await UsersEntities.signIn(email, password);
        return response.status(returns.code).json(returns)

    }
    static async signUp(request: Request, response: Response) {
        const { email, password } = request.body;


        const returns = await UsersEntities.signUp(email, password);
        return response.status(returns.code).json(returns)

    }
}


export { UsersController }