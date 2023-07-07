import { sign } from 'jsonwebtoken';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

import authconfig from "../../configs/auth";
import { poll } from '../mysql';
import { CUSTOM_MESSAGE } from '../../configs/message';

class UsersEntities {
    static async signIn(email: string, password: string) {
        const [rows] = await poll.query("SELECT * FROM users AS u WHERE u.email = ?", [email])
        const user = rows[0]

        if (!user) {
            return CUSTOM_MESSAGE({
                code: 401,
                error: true,
                path: "USERSENTITIES:SIGNIN",
                message: "Email e/ou senha incorretos",
                data: []
            })
        }
        else {
            const [rows] = await poll.query("SELECT * FROM establishments AS e WHERE e.id = ?", [user?.id]);
            const estabelecimento = rows[0];

            const passwordMatched = compareSync(password, user?.password);

            if (!passwordMatched) {
                return CUSTOM_MESSAGE({
                    code: 401,
                    error: true,
                    path: "USERSENTITIES:SIGNIN",
                    message: "E-MAIL OU SENHA INVÁLIDOS.",
                    data: {}
                })
            }

            delete user.password;
            delete user.recover_password;


            const dataUser = {
                ...user,
                establishmentId: estabelecimento?.id
            }

            const { secret, expiresIn } = authconfig.jwt;

            const token = sign({ user: JSON.stringify(dataUser) }, secret, { expiresIn: expiresIn });

            return CUSTOM_MESSAGE({
                path: "USERSENTITIES:SIGNIN",
                data: { dataUser, token }
            })
        }

    }

    static async signUp(email: string, password: string) {
        const [rows] = await poll.query("SELECT U.email FROM users AS U WHERE U.email = ? LIMIT 1", [email])
        const user = rows[0]

        if (user != undefined) {
            return CUSTOM_MESSAGE({
                code: 406,
                error: true,
                path: "USERSENTITIES:SIGNIN",
                message: "Esse E-mail já está cadastrado no sistemas.",
                data: {}
            })
        } else {
            const salt = genSaltSync(10)
            const passwordHash = hashSync(password, salt)
            const [rows] = await poll.query("INSERT INTO users (email,password) VALUES (?,?);", [email, passwordHash])
            return CUSTOM_MESSAGE({
                path: "USERSENTITIES:SIGNIN",
                data: { rows }
            })
        }

    }
}




export { UsersEntities }