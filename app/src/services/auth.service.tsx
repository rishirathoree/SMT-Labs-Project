import Api from "@/lib/axios.utils"
import type { LoginPayload, SignupPayload } from "@/@types/auth.types"

const SignupService = async (data: SignupPayload) => {
    const response = await Api.post("/users/create", data, {})
    return response
}

const LoginService = async (data: LoginPayload) => {
    const response = await Api.post("/users/login", data, {})
    return response
}

const GetTeams = async () => {
    const response = await Api.get("/users/", {})
    return response
}

const CreateTeamate = async (data: any) => {
    const response = await Api.post("/users/team-user", data, {})
    return response
}

export const AuthService = {
    SignupService,LoginService,GetTeams,CreateTeamate,
}