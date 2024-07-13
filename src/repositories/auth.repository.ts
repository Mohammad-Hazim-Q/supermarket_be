
import * as bcrypt from "bcrypt";
import * as fsp from 'fs/promises';
import * as jwt from "jsonwebtoken";
import { exceptionMap } from '../error-handler/exception-map';
import { HttpException } from '../error-handler/http-error.class';
import { AbstractRepository } from './abstract.repository';

export class AuthRepository extends AbstractRepository {
    mockPath = '\\..\\mock-data\\users.txt';

    constructor() {
        super();
    }


    async login(email: string, password: string) {

        try {

            const users = await this.getUsers();

            const user = users.find(u => u.email === email);

            if (!user) throw new HttpException(exceptionMap.NoDataFound);

            let isSamePassword = await bcrypt.compare(password, user.password)

            if (!isSamePassword) throw new HttpException(exceptionMap.InvalidUsernameOrPassword)


            // generate token for logged in user.

            let payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            let result = {
                token: jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "8h"
                }),

                user: payload
            }

            return result

        } catch (error) {
            throw error
        }
    }

    async createUser(email: string, password: string, name: string) {

        try {

            const users = await this.getUsers();
            const user = users.find(u => u.email === email);

            if (user) throw new HttpException(exceptionMap.EmailExists);

            let newUser = {
                id: users.length + 1,
                email,
                password: await this.hashPassword(password),
                name
            }

            await fsp.appendFile(__dirname + this.mockPath, JSON.stringify(newUser) + '##')

        } catch (error) {
            throw error
        }
    }

    async getUsers() {
        return await this.getDataFromFile(this.mockPath)
    }

    private async hashPassword(unHashedPassword: string) {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(unHashedPassword, salt);

        return hashedPassword
    }
}