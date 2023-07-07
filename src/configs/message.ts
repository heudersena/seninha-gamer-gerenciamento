
interface IMessage {
    error?: boolean,
    message?: string,
    path: string,
    data: any,
    code?: number
}

const CUSTOM_MESSAGE = ({ error = false, message = "OPERAÇÃO EXECUTADA COM SUCESSO.", path, data, code = 200 }: IMessage) => {
    return {code, error, message: message.toUpperCase(), path: path.toUpperCase(), data }
}

export { CUSTOM_MESSAGE }