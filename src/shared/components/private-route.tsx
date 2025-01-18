import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '~modules/user/slice';

function PrivateRoute() {
    const user = useSelector(selectCurrentUser);
    if (!user) return <Navigate to='/login' replace />;

    return <Outlet />;
}

export default PrivateRoute;
