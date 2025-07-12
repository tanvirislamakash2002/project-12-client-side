import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { role, roleLoading } = useUserRole();

    if ( roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if ( role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;