import { Request, Response } from "express";
import { GamesEntities } from "../database/query/GamesEntities";
import { CUSTOM_MESSAGE } from "../configs/message";

import { v4 } from "uuid";
import { IMP, MercadoPago } from "../utils/MercadoPago";

class GamersController {
    static async index(request: Request, response: Response) {
        const content = await GamesEntities.index()
        response.json(content)
    }

    static async create(request: Request, response: Response) {

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
        MP.response.status_detail
        const returns = {
            id: MP.response.id,
            status_detail: MP.response.status_detail,
            transaction_id: MP.response.transaction_details.transaction_id,
            qr_code_base64: MP.response.point_of_interaction.transaction_data.qr_code_base64
        }

        return response.json({ mercado_pago: returns, code, arr, })

    }



}


export { GamersController }