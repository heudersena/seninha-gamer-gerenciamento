import { poll } from "../mysql"

class BuscarPorcentagem {
    static async getPorcentagem() {
        try {
            const [rows] = await poll.query("SELECT * FROM TB_BUSCAR_PORCENTAGEM WHERE id = ?", [1]);
            const item = rows[0]
            const returns = {
                VALOR_DA_APOSTA: parseFloat(item.FIELD_VALOR_CADA_APOSTA),
                ACUMULATIVO: Number(item.FIELD_VALOR_PORCENTAGEM_CASA_ACUMULATIVO), // ACUMULATIVO
                LUCRO_CASA: Number(item.FIELD_VALOR_PORCENTAGEM_CASA), // LUCRO ZÉ
                RETORNAR_AO_JOGO: Number(item.FIELD_VALOR_PORCENTAGEM_PARA_JOGO) // 70%
            }
            return returns;
        } catch (error) {
            return error;
        }

    }
}

export { BuscarPorcentagem }