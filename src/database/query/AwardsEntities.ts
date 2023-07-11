import { IMP, MercadoPago } from "../../utils/MercadoPago"
import { poll } from "../mysql"


class AwardsEntities {
    static async addMoneyOnMatch(values: number) {
        // VERIFICAR SE EXISTE STATUS IN_PROCESSSING NA TABLE AWARDS. SE EXISTIR ADIONCAR O VALOR AINDA NESSA PARTIDA
        const [pagamento] = await poll.query("SELECT * FROM VIEW_VERIFICAR_SE_EXISTE_PAGAMENTO_IN_PROCESSO;")

        const mercado_pago = await MercadoPago.createPayment({ transaction_amount: values, payment_method_id: "debit_card", payer: { email: "heuderdev@gmail.com" }, installments: 1 }) as IMP
        console.log(JSON.stringify(mercado_pago,null,2));        
        // SE O STATUS FOR REFUSES_VALUES ADICIONAR NUMA TABELA PIVOR PARA QUANDO O JOGO TERMINAR SEJA ADICIONADO PARA A PROXIMA PARTIDA.
        const id = pagamento[0]?.id

        if (id != undefined) {
            const [valuesOld] = await poll.query("SELECT * FROM TB_ACUMULA_VALORES_CASO_AWARDS_DIFERENTE_IN_PROCESSING WHERE id = 1;")
            const subtract_premiums_old = Number(pagamento[0]?.subtract_premiums)
            const subtract_premiums_new = subtract_premiums_old + values
            console.log(Number(valuesOld[0]?.amount));
            console.log(subtract_premiums_old);
            console.log(subtract_premiums_new);
            // const [rows] = await    poll.query("INSERT INTO TB_ACUMULA_VALORES_CASO_AWARDS_DIFERENTE_IN_PROCESSING (amount) VALUES (?)",[])       

        } else {
            console.log("RECURSO EM PROCESSO.");
        }

        return {}

    }

}


export { AwardsEntities }