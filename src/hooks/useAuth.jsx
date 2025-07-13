import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthContext';

const useAuth = () => {
    const authData = useContext(AuthContext)
    return authData;
};

export default useAuth;