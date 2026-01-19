import type { CreateOrderPayload } from "@/@types/orders.types"
import Api from "@/lib/axios.utils"

const CreateOrder = async(data:CreateOrderPayload) => {
    const response = await Api.post("/orders/create", data, {})
    return response
}

const GetOrders  = async() => {
    const response = await Api.get("/orders", {})
    return response
}

const CancelOrder = async(id:string | number) => {
    const response = await Api.post(`/orders/cancel-order/${id}`,{}, {})
    return response
}

export const OrderServices = {
    CreateOrder,GetOrders,CancelOrder
}