import { Request, Response } from "express"
import { EstablishmentsEntities } from "../database/query/EstablishmentsEntities"

class EstablishmentsController {
    static async create(request: Request, response: Response) {
        try {
            const { name, userId, seller_code, number_phone, number_code, description } = request.body
            console.log(`INSERT INTO establishments (name, userId, seller_code, number_phone, number_code, description) VALUES (${name}, ${userId}, ${seller_code}, ${number_phone}, ${number_code}, ${description}) `);
            
            const content = await EstablishmentsEntities.create(name, userId, seller_code, number_phone, number_code, description)
            return response.status(content.code).json(content)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}



export { EstablishmentsController }




