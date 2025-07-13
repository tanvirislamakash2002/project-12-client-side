import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const RestaurantRoute = ({ children }) => {
    const { role, roleLoading } = useUserRole();

    if ( roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if ( role !== 'restaurant') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default RestaurantRoute;