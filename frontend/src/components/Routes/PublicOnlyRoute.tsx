import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../../redux/hooks"

function PublicOnlyRoute() {
    const {isAuthenticated, user} = useAppSelector(state => state.auth);

    if (isAuthenticated || user != null) {
        return <Navigate to="/home" replace/>
    }

    return (
        <Outlet />
    )
}

export default PublicOnlyRoute;