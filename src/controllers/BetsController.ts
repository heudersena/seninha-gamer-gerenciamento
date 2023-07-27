import { Request, Response } from "express";
import { BetsEntities } from "../database/query/BetsEntities"
import { CUSTOM_MESSAGE } from "../configs/message";

class BetsController {
    static async search_concurso(request: Request, response: Response): Promise<any> {
        try {
            const { concurso } = request.body as any;
            const establishmentId = request.user.establishmentId
            const content = await BetsEntities.seekContestWinners(Number(establishmentId), Number(concurso));
            const _concursos = content[0][0][0]
            const _pagamento = content[1][0][0]
            const returns = CUSTOM_MESSAGE({
                data: { _pagamento, _concursos },
                path: "BetsController:search_concurso"
            })
            
            
            return response.json(returns)
        } catch (error) {
            const returns = CUSTOM_MESSAGE({
                error: true,
                code: 400,
                message: JSON.stringify(error),
                data: {},
                path: "BetsController:search_concurso"
            })
            return response.json(returns)
        }
    }
}


export { BetsController }