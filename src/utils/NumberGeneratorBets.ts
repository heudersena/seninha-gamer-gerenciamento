

class NumberGeneratorBets {
    static async handle() {
        const numeros: any = [];

        for (let i = 1; i <= 60; i++) {
            numeros.push(i);
        }

        for (let i = numeros.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
        }

        const numbers = numeros.slice(0, 35)
        const numberOrders = numbers.sort((a: number, b: number) => a - b)
        return numberOrders.toString()
    }
}
export { NumberGeneratorBets }