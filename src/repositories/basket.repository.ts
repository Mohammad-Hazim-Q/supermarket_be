import * as fsp from 'fs/promises';
import { AbstractRepository } from "./abstract.repository";
export class BasketRepository extends AbstractRepository {

    basketMockPath = '\\..\\mock-data\\basket.txt';

    constructor() {
        super();
    }

    async getBasket(userId: string | number) {

        try {

            const data = await this.getDataFromFile(this.basketMockPath)

            return { basket: data.filter(u => u.userId == userId) }

        } catch (error) {
            throw error
        }
    }

    async addToBasket(userId: string | number, product: any) {

        try {

            const data = await this.getDataFromFile(this.basketMockPath)

            let userBasket = await this.getBasket(userId)
            let count = userBasket.basket.length;

            let newItem = {
                id: data.length + 1,
                userId: userId,
                product
            }

            await fsp.appendFile(__dirname + this.basketMockPath, JSON.stringify(newItem) + '##')


            return {
                count: count + 1
            }

        } catch (error) {
            throw error
        }

    }

    async deleteBasket(userId: string | number, id: any) {

        try {


            const data = await this.getDataFromFile(this.basketMockPath)

            let filteredBasket = data.filter(row => row.id != id);
            let userItemsCount = filteredBasket.filter(row => row.userId == userId).length;

            let dataToWrite = filteredBasket.map(row => JSON.stringify(row)).join('##')

            await fsp.writeFile(__dirname + this.basketMockPath, dataToWrite)

            return {
                count: userItemsCount
            }

        } catch (error) {
            throw error
        }

    }

}