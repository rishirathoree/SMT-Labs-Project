
export type CategoriesParamPayload = {
    page: number | string;
}

export type CategoriesCreatePayload = {
    name: string;
    description: string;
}


export type Categories = {
    id: string;
    name: string;
    orderSequence: string;
    totalAmount: number;
    organizationId: {
        name: string;
    };
    description: string;
    createdAt: string;
}