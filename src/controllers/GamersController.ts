import { Request, Response } from "express";
import { GamesEntities } from "../database/query/GamesEntities";
import { CUSTOM_MESSAGE } from "../configs/message";

import { v4 } from "uuid";

class GamersController {
    static async index(request: Request, response: Response) {
        const content = await GamesEntities.index()
        response.json(content)
    }

    static async create(request: Request, response: Response) {

        const quantities = request.body.quantities ? request.body.quantities <= 10 ? request.body.quantities : 12 : 1;

        const code = v4()

        if (request.user.establishmentId == undefined) {

            return response.status(401).json(CUSTOM_MESSAGE({
                error: true,
                code: 401,
                data: {},
                path: "GamersController:create",
                message: "você ainda não possui instabelecimento registrado."
            }))
        }

        const establishmentId = Number(request.user.establishmentId);

        const arr: any = [];

        for (let i = 0; i < quantities; i++) {
            const content = await GamesEntities.gameGenerator(establishmentId, code);
            arr.push(content)
        }

        return response.json({ code, arr, })

    }



}


export { GamersController }