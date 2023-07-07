import { Request, Response } from "express";
import { BetsEntities } from "../database/query/BetsEntities"

class BetsController {
    static async search_concurso(request: Request, response: Response): Promise<any> {
        const { concurso } = request.body as any;
        const establishmentId = request.user.establishmentId
        const content = await BetsEntities.seekContestWinners(Number(establishmentId), Number(concurso));
        const _concursos = content[0][0][0]
        const _pagamento = content[1][0][0]
        response.json({ _pagamento, _concursos })
    }
}


export { BetsController }