import type { ProductCreatePayload, ProductsParamPayload } from "@/@types/products.types"
import Api from "@/lib/axios.utils"

const Get = async (param:ProductsParamPayload) => {
    return Api.get("/products",param,)
}

const Create = async (data: ProductCreatePayload) => {
    const response = await Api.post("/products/create", data, {})
    return response
}

export const ProductServices = {
    Get,Create
}