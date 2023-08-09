import { poll } from "../mysql"

class Acumulacao {
    static async getAcumulacao() { 
        await poll.query("")
    }
}

export { Acumulacao }