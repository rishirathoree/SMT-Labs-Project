import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/store/store"

export const useAuthState = () => {
  const { token, user, organizations } = useSelector(
    (state: RootState) => state.auth
  )

  const isOwner = user?.role === "OWNER"
  const isStaff = user?.role === "STAFF"
  const role = user?.role
  const dispatch = useAppDispatch()
  const isAuthenticated = Boolean(token && user)
  const hasOrganization = Boolean(organizations)

  return {
    token,
    role,
    user,
    organizations,
    dispatch,
    isStaff,
    isOwner,
    isAuthenticated,
    hasOrganization,
  }
}
