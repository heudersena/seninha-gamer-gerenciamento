import { Request, Response } from "express";


import { IMP, MercadoPago } from "../utils/MercadoPago"

class PaymentsController {
    static async checkPayment(request: Request, response: Response) {
        // 60569241434
        // 60569033266 - Pago
        const content = await MercadoPago.GetPayment(60569033266) as IMP
        return response.json({
            user: request.user,
            id: content.response.transaction_details.transaction_id,
            content
        })
    }


    static async webhook(request: Request, response: Response) { }


}



export { PaymentsController }