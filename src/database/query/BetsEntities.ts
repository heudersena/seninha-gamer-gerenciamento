import { CUSTOM_MESSAGE } from "../../configs/message";
import { poll } from "../mysql"

class BetsEntities {
    static async seekContestWinners(establishmentId: number, concurso: number) {
        // const [rows] = await poll.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_CONCURSO(?,?)", [establishmentId, concurso])
        // const [rows] = await poll.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_TODOS(?)", [concurso])

        return await Promise.all([
            await poll.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_CONCURSO(?,?)", [establishmentId, concurso]),
            await poll.query("CALL PROCEDURE_BUSCAR_VALORES_A_SER_PAGO(?)", [concurso]),
        ])
    }

    static async getOneConcurso(numero: number) {
        try {
            // const content = await poll.query("CALL PROCEDURE_VERIFICA_CONCURSO_PREMIADO(?)", [numero]);

            const [premiada] = await poll.query("CALL PROCEDURE_VERIFICA_CONCURSO_PREMIADO(?)", [numero])
            const [pagamento] = await poll.query("CALL PROCEDURE_BUSCAR_VALORES_A_SER_PAGO(?)", [premiada[0][0]?.number_game_result])

            console.log(pagamento[0][0]);


            const response = { premiada: premiada[0][0], pagamento: pagamento[0][0] }

            if (premiada != undefined) {
                return CUSTOM_MESSAGE({
                    data: response,
                    path: "betsentities.ts::getOneConcurso",
                })
            }

            return CUSTOM_MESSAGE({
                data: {},
                error: true,
                code: 401,
                path: "betsentities.ts::getOneConcurso",
                message: "OPS, sua consulta não possui nenhum resultado."
            })
        } catch (error) {
            return CUSTOM_MESSAGE({
                data: {},
                error: true,
                code: 401,
                path: "betsentities.ts::getOneConcurso::catch",
                message: JSON.stringify(error)
            })
        }

    }
}

export { BetsEntities }