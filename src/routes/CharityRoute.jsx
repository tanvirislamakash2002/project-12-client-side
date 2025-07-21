import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const CharityRoute = ({ children }) => {
    const { role, roleLoading } = useUserRole();

    if ( roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if ( role !== 'charity') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default CharityRoute;