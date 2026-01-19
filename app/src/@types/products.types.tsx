
export type ProductsParamPayload = {
    page: number | string;
    categoryId: string;
}

export type ProductCreatePayload = {
    name: string;
    categoryId: string[];
    description: string;
    price: number | string;
    sku: string;
    stock: number | string;
}