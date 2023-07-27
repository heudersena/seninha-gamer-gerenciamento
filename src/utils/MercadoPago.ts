import "dotenv/config"
import mercadopago from "mercadopago"
import dayjs from "dayjs"

mercadopago.configurations.setAccessToken(String(process.env.MERCADO_PAGO_KEY_PROD));

interface IMercadoPagoCreate {
    transaction_amount: number,
    payment_method_id: "pix" | "debit_card",
    payer: {
        email: string
    },
    installments: number,
    date_of_expiration?: string
}

export interface IMP {
    response: {
        id: number,
        status: 'pending', 'approved', 'cancelled',
        status_detail: 'accredited' | 'cancelled' | 'pending_waiting_transfer' | 'expired',
        payer: {
            email: string
        },
        transaction_details: {
            payment_method_reference_id: null,
            acquirer_reference: null,
            net_received_amount: 0,
            total_paid_amount: 100,
            overpaid_amount: 0,
            external_resource_url: null,
            installment_amount: 0,
            financial_institution: null,
            payable_deferral_period: null,
            bank_transfer_id: null,
            transaction_id: null
        },
        point_of_interaction: {
            transaction_data: {
                qr_code: string,
                transaction_id: string,
                ticket_url: string,
                qr_code_base64: string
            }
        }
    }
}


class MercadoPago {
    static async createPayment(data: IMercadoPagoCreate): Promise<IMP | unknown> {
        const MercadoPago: IMercadoPagoCreate = {
            transaction_amount: data.transaction_amount,
            payment_method_id: "pix",
            payer: {
                email: data.payer.email
            },
            installments: 1,
            date_of_expiration: String(dayjs(new Date()).add(10, 'minutes').format('YYYY-MM-DDTHH:mm:ss.000ZZ'))
        };
        const content = await mercadopago.payment?.save(MercadoPago)
        return content;
    }

    static async GetPayment(n: number) {
        return await mercadopago.payment.findById(n)
    }
}





export { MercadoPago }