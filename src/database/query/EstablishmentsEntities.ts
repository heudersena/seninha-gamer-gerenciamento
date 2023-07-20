import { CUSTOM_MESSAGE } from "../../configs/message";
import { poll } from "../mysql";

class EstablishmentsEntities {
    static async create(name: string, userId: number, seller_code: string, number_phone: string, number_code: string, description: string) {
        try {
            const [createdEstablishement] = await poll.query("INSERT INTO establishments (name, userId, seller_code, number_phone, number_code, description) VALUES (?,?,?,?,?,?)", 
            [
                name, userId, seller_code, number_phone, number_code, description
            ])

            return CUSTOM_MESSAGE({
                path: "ESTABLISHMENTSENTITIES::CREATE::TRY",
                data: { createdEstablishement }
            })


        } catch (error) {
            return CUSTOM_MESSAGE({
                error: true,
                code: 400,
                path: "ESTABLISHMENTSENTITIES::CREATE::CATCH",
                data: {},
                message: JSON.stringify(error, null, 2)
            })
        }
    }
}


export { EstablishmentsEntities }




