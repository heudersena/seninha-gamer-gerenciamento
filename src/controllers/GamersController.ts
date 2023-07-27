import { Request, Response } from "express";
import { GamesEntities } from "../database/query/GamesEntities";
import { CUSTOM_MESSAGE } from "../configs/message";

import { v4 } from "uuid";
import { IMP, MercadoPago } from "../utils/MercadoPago";
import { poll } from "../database/mysql";
import { buscar_jogos_ultimo_insert } from "../database/query/FunctionsUtils";

class GamersController {
    static async index(request: Request, response: Response) {
        const content = await GamesEntities.index()
        response.json(content)
    }

    static async create(request: Request, response: Response) {
        
        try {
            const code = v4()
            const quantities = request.body.quantities ? request.body.quantities <= 10 ? request.body.quantities : 12 : 1;
            const type_pagamento = request.body.type_pagamento // PIX ou DINHEIRO

            if (request.user.establishmentId == undefined) {
                return response.status(401).json(CUSTOM_MESSAGE({
                    error: true,
                    code: 401,
                    data: {},
                    path: "GamersController:create",
                    message: "você ainda não possui instabelecimento registrado."
                }))
            }

            const establishmentId = Number(request.user.establishmentId);

            for (let i = 0; i < quantities; i++) {
                await GamesEntities.gameGenerator(establishmentId, code);
            }

            const aposta_bd = await buscar_jogos_ultimo_insert(code)
            
            const amount = quantities * 2
            const amount30 = (amount * 30) / 100;
            const amount70 = (amount * 70) / 100;
            

            if (type_pagamento == "pix") {
                const MP = await MercadoPago.createPayment({ transaction_amount: amount, payment_method_id: "debit_card", payer: { email: request.user.email }, installments: 1 }) as IMP
                const id = MP.response.id
                const status = MP.response.status
                const status_detail = MP.response.status_detail
                const email = MP.response.payer.email
                const qr_code = MP.response.point_of_interaction.transaction_data.qr_code
                const ticket_url = MP.response.point_of_interaction.transaction_data.ticket_url
                const transaction_id = MP.response.transaction_details.transaction_id
                const qr_code_base64 = MP.response.point_of_interaction.transaction_data.qr_code_base64

                const [transaction] = await poll.query("CALL PROCEDURE_INSERT_TRANSACTION(?,?,?,?,?,?,?,?,?,?)",
                    [
                        amount,
                        type_pagamento,
                        id,
                        status,
                        status_detail,
                        email,
                        qr_code,
                        ticket_url,
                        transaction_id,
                        qr_code_base64
                    ])
                request.io.emit("ATUALIZAR::VALORES::MOEDA", {}); // ATUALIZAR OS VALORES DOS PREMIOS EM TEMPO REAL
                return response.json({ mercadopago: { id, status_detail, transaction_id, qr_code_base64, email }, code, apostas: aposta_bd, transaction: transaction[0][0] })

            } else {
                const [transaction] = await poll.query("CALL PROCEDURE_INSERT_TRANSACTION(?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)", [amount70, type_pagamento])
                request.io.emit("ATUALIZAR::VALORES::MOEDA", {});
                return response.json({ mercadopago: {}, apostas: aposta_bd, transaction: transaction[0][0] })
            }

        } catch (error) {
            return response.json({ mercadopago: {}, apostas: {}, transaction: {}, error })
        }


    }



}


export { GamersController }