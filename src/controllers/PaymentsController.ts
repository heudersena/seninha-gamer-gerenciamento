import { Request, Response } from "express";


import { IMP, MercadoPago } from "../utils/MercadoPago"
import { poll } from "../database/mysql";

class PaymentsController {
    static async checkPayment(request: Request, response: Response) {
        try {
            const id = Number(request.body.id);
            // 60569241434
            // 60569033266 - Pago
            const content = await MercadoPago.GetPayment(id) as IMP
            const status_detail = content.response.status_detail;
            const status = content.response.status;
            // UPDATE awards SET player_block = _PLAYER_BLOCK WHERE gamer_ref = param_id;	       
            const [transactions] = await poll.query("UPDATE transactions AS T SET m_status= ?, m_status_detail=? WHERE m_id =? ", [status, status_detail, id])

            return response.json({
                id: content.response.transaction_details.transaction_id
            })
        } catch (error) {
            return response.json({ id: {}, error })
        }
    }


    static async webhook(request: Request, response: Response) { }



}



export { PaymentsController }