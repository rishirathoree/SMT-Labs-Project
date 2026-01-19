import { Navigate, Outlet } from "react-router"
import Layout from "@/layout"
import { useAuthState } from "@/hooks/use-auth"

type GuardType = "public" | "private" | "after-login"

type Props = {
    type: GuardType
    withLayout?: boolean
}

const RouteGuard = ({ type, withLayout = false }: Props) => {
    const { isAuthenticated, hasOrganization } = useAuthState()

    if (type === "public") {
        return isAuthenticated && hasOrganization ? (
            <Navigate to="/" replace />
        ) : (
            <Outlet />
        )
    }

    if (type === "private") {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />
        }

        return withLayout ? (
            <Layout>
                <Outlet />
            </Layout>
        ) : (
            <Outlet />
        )
    }

    if (type === "after-login") {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />
        }

        return <Outlet />
    }

    return null
}

export default RouteGuard
