import { poll } from "../mysql"

class BetsEntities {
    static async seekContestWinners(establishmentId: number, concurso: number) {
        // const [rows] = await poll.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_CONCURSO(?,?)", [establishmentId, concurso])
        // const [rows] = await poll.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_TODOS(?)", [concurso])

        return Promise.all([
            await poll.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_CONCURSO(?,?)", [establishmentId, concurso]),
            await poll.query("CALL PROCEDURE_BUSCAR_VALORES_A_SER_PAGO(?)", [concurso])
        ])
    }
}

export { BetsEntities }