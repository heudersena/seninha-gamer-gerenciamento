import { Request, Response } from "express";
import { AwardsEntities } from "../database/query/AwardsEntities";

class AwarsController {
    static async add(request: Request, response: Response) {
        const content = await AwardsEntities.addMoneyOnMatch(1)
        return response.json(content)
    }
}



export { AwarsController }