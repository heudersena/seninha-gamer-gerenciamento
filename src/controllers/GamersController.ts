import { Request, Response } from "express";
import { GamesEntities } from "../database/query/GamesEntities";
import { CUSTOM_MESSAGE } from "../configs/message";

import { v4 } from "uuid";
import { IMP, MercadoPago } from "../utils/MercadoPago";
import { poll } from "../database/mysql";

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

            const arr: any = [];

            for (let i = 0; i < quantities; i++) {
                const content = await GamesEntities.gameGenerator(establishmentId, code);
                arr.push(content)
            }

            const amount = quantities * 2

            const MP = await MercadoPago.createPayment({ transaction_amount: amount, payment_method_id: "debit_card", payer: { email: request.user.email }, installments: 1 }) as IMP
            if (type_pagamento == "pix") {
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
                return response.json({ mercadopago: { id, status_detail, transaction_id, qr_code_base64, email }, code, apostas: arr, transaction })

            } else {
                const [transaction] = await poll.query("CALL PROCEDURE_INSERT_TRANSACTION(?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)", [amount, type_pagamento])
                return response.json({ mercadopago: {}, data: arr, transaction: transaction[0][0] })
            }
        } catch (error) {
            return response.json({ mercadopago: {}, apostas: {}, transaction: {}, error })
        }


    }



}


export { GamersController }