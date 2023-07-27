import { CUSTOM_MESSAGE } from "../../configs/message";
import { poll } from "../mysql";

class GamesEntities {
    static async index() {
        try {
            const [rows] = await poll.query("SELECT * FROM games")
            return CUSTOM_MESSAGE({
                path: "GAMESENTITIES:INDEX",
                data: { rows }
            })
        } catch (error) {
            return CUSTOM_MESSAGE({
                error: true,
                path: "GAMESENTITIES:INDEX",
                message: JSON.stringify(error),
                data: {}
            })
        }
    }

    static async gameGenerator(establishmentId: number, code: string) {
        
        try {
            const [rows] = await poll.query("CALL PROCEDURE_REGISTRAR_JOGOS(?,?,?)", [establishmentId, 25, code])
            const aposta = rows[0]
            return aposta
            // return CUSTOM_MESSAGE({
            //     path: "GAMESENTITIES:gameGenerator",
            //     data: { aposta }
            // })
        } catch (error) {
            return CUSTOM_MESSAGE({
                error: true,
                path: "GAMESENTITIES:gameGenerator",
                message: JSON.stringify(error),
                data: {}
            })
        }
    }
}

export { GamesEntities }