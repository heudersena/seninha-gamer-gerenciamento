import { poll } from "../mysql";

async function buscar_jogos_ultimo_insert(id: string) {
    const [bets] = await poll.query("SELECT * FROM bets WHERE code_cart=?", [id]);    
    const aposta = bets;
    return aposta;
}

export { buscar_jogos_ultimo_insert }