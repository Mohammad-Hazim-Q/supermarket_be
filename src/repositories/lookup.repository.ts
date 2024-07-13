import { AbstractRepository } from "./abstract.repository";

export class LookupRepository extends AbstractRepository {

    categoriesMockPath = '\\..\\mock-data\\categories.txt';
    productsMockPath = '\\..\\mock-data\\products.txt';

    constructor() {
        super();
    }

    async getAllCategories() {

        try {
            const categories = await this.getDataFromFile(this.categoriesMockPath)
            return { categories }

        } catch (error) {
            throw error
        }
    }

    async getProducts(categoryId?: any) {

        try {

            const products = await this.getDataFromFile(this.productsMockPath)
            return {
                products:
                    categoryId ? products.filter(product => product.categoryId == categoryId)
                        : products
            }

        } catch (error) {
            throw error
        }
    }

    async getRandomProducts() {

        try {
            const { products } = await this.getProducts();
            return { products: products.slice(0, 8) }

        } catch (error) {
            throw error
        }
    }

}