import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../../redux/hooks"

function ProtectedRoute() {
    const {isAuthenticated, user} = useAppSelector(state => state.auth);

    if (!isAuthenticated || user == null) {
        return <Navigate to="/login" replace/>
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute;