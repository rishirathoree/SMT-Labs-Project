import type { CategoriesCreatePayload, CategoriesParamPayload } from "@/@types/categories.types"
import Api from "@/lib/axios.utils"

const Create = async(data:CategoriesCreatePayload)=>{
    const response = await Api.post("/categories/create",data,{})
    return response
}

const Get = async(params:CategoriesParamPayload)=>{
    const response = await Api.get("/categories",params)
    return response
}

export const CategoriesServices = {
    Create,
    Get
}