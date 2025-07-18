import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import AdminProfile from './Admin/AdminProfile'
import CharityProfile from './Charity/CharityProfile';
import RestaurantProfile from './Restaurant/RestaurantProfile';
import MyProfile from './User/MyProfile';

const Profile = () => {
    const { role, roleLoading } = useUserRole();
    if (!roleLoading && role === 'user') {
        return <MyProfile></MyProfile>;
    }
    if (!roleLoading && role === 'charity') {
        return <CharityProfile></CharityProfile>;
    }
    if (!roleLoading && role === 'restaurant') {
        return <RestaurantProfile></RestaurantProfile>;
    }
    if (!roleLoading && role === 'admin') {
        return <AdminProfile></AdminProfile>;
    }
};

export default Profile;