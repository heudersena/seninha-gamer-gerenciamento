import { Request, Response } from "express"
import { AdressesEntities } from "../database/query/AdressesEntities"
class AdressesController {
    static async create(request: Request, response: Response) {

        try {
            const {
                cep,
                state,
                city,
                neighborhood,
                street,
                number,
                geographic_location,
                latitude,
                longitude,
            } = request.body

            const establishmentId = request.user?.establishmentId;
            console.log(request.body,establishmentId);
            
            const content = await AdressesEntities.create(
                cep,
                state,
                city,
                neighborhood,
                street,
                number,
                geographic_location,
                latitude,
                longitude,
                establishmentId
            );

            return response.status(content.code).json(content)
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}


export { AdressesController }


