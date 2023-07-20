import { CUSTOM_MESSAGE } from "../../configs/message";
import { poll } from "../mysql";

class AdressesEntities {
    static async create(cep: string, state: string, city: string, neighborhood: string, street: string, number: string, geographic_location: string, latitude: string, longitude: string, establishmentId: number) {

        try {
            const [createdAdresses] = await poll.query("INSERT INTO adresses (cep, state, city, neighborhood, street, number, geographic_location, latitude, longitude, establishmentId) VALUES (?,?,?,?,?,?,?,?,?,?)", 
            [
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
            ]);

            return CUSTOM_MESSAGE({
                path: "ADRESSESENTITIES::CREATE::TRY",
                data: { createdAdresses }
            })

        } catch (error) {
            return CUSTOM_MESSAGE({
                error: true,
                code: 400,
                path: "ADRESSESENTITIES::CREATE::CATCH",
                data: {},
                message: JSON.stringify(error, null, 2)
            })

        }

    }
}

export { AdressesEntities }


