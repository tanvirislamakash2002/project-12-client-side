import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';

const useAuth = () => {
    const authData = use(AuthContext)
    return authData;
};

export default useAuth;