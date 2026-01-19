import Api from "@/lib/axios.utils"
import type { WorkspacePayload } from "@/@types/workspace.types"

const Create = async (data: WorkspacePayload) => {
    const response = await Api.post("/organizations/create", data, {})
    return response
}

export const WorkspaceServices = {
    Create,
}