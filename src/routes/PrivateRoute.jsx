
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <span>loading...</span>
    }
    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;