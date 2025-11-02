import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddDonation from "../pages/Dashboard/Restaurant/AddDonation";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyDonation from "../pages/Dashboard/Restaurant/MyDonation";
import RequestCharityRole from "../pages/Dashboard/User/RequestCharityRole";
import StripeElementsWrapper from "../pages/Dashboard/User/StripeElementsWrapper";
import ManageRoleRequests from "../pages/Dashboard/Admin/ManageRoleRequests";
import TransactionHistory from "../pages/Dashboard/TransactionHistory";
import ManageDonations from "../pages/Dashboard/Admin/ManageDonations";
import AllDonations from "../pages/AllDonations";
import DonationDetails from "../pages/DonationDetails";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import RestaurantRoute from "../routes/RestaurantRoute";
import MyReviews from "../pages/Dashboard/MyReviews";
import Favorites from "../pages/Dashboard/Favorites";
import MyRequests from "../pages/Dashboard/Charity/MyRequests";
import RequestedDonations from "../pages/Dashboard/Restaurant/RequestedDonations";
import MyPickups from "../pages/Dashboard/Charity/MyPickups";
import ReceivedDonations from "../pages/Dashboard/Charity/ReceivedDonations";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests";
import FeatureDonations from "../pages/Dashboard/Admin/FeatureDonations";
import DonationStats from "../pages/Dashboard/Restaurant/DonationStats";
import UpdateDonation from "../pages/Dashboard/Restaurant/UpdateDonation";
import Profile from "../pages/Dashboard/Profile";
import ErrorPage from "../pages/ErrorPage";
import CharityRoute from "../routes/CharityRoute";
import UserRoute from "../routes/UserRoute";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: 'allDonations',
                element: <PrivateRoute>
                    <AllDonations></AllDonations>
                </PrivateRoute>
            },
            {
                path: 'donationDetails/:id',
                element: <PrivateRoute>
                    <DonationDetails></DonationDetails>
                </PrivateRoute>
            },
            {
                path: 'forbidden',
                element: <Forbidden></Forbidden>
            },

        ]
    },
    {
        path: "/",
        element: <AuthLayout></AuthLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: "/dashboard",
        element:
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            {
                path:'profile',
                element: <Profile></Profile>
            },
            // user route

            {
                path: 'requestCharityRole',
                element: <UserRoute>
                    <StripeElementsWrapper>
                        <RequestCharityRole></RequestCharityRole>
                    </StripeElementsWrapper>
                </UserRoute>
            },
            {
                path: 'transactionHistory',
                element: <TransactionHistory></TransactionHistory>

            },
            {
                path: 'myReviews',
                element: <MyReviews></MyReviews>

            },
            {
                path: 'favorites',
                element: <Favorites></Favorites>

            },
            // charity route 

            {
                path: 'myRequests',
                element: <CharityRoute>
                    <MyRequests></MyRequests>
                </CharityRoute>
            },
            {
                path: 'myPickups',
                element: <CharityRoute>
                    <MyPickups></MyPickups>
                </CharityRoute>
            },
            {
                path: 'receivedDonations',
                element: <CharityRoute>
                    <ReceivedDonations></ReceivedDonations>
                </CharityRoute>
            },
            // restaurant route
            {
                path: 'addDonation',
                element: <RestaurantRoute>
                    <AddDonation></AddDonation>
                </RestaurantRoute>
            },

            {
                path: 'donationStats',
                element: <RestaurantRoute>
                    <DonationStats></DonationStats>
                </RestaurantRoute>
            },
            {
                path: 'myDonations',
                element: <RestaurantRoute>
                    <MyDonation></MyDonation>
                </RestaurantRoute>
            },
            {
                path: 'updateDonation/:id',
                element: <RestaurantRoute>
                    <UpdateDonation></UpdateDonation>
                </RestaurantRoute>
            },
            {
                path: 'requestedDonations',
                element: <RestaurantRoute>
                    <RequestedDonations></RequestedDonations>
                </RestaurantRoute>
            },
            // admin route

            {
                path: 'manageRoleRequests',
                element: <AdminRoute>
                    <ManageRoleRequests></ManageRoleRequests>
                </AdminRoute>

            },
            {
                path: 'manageDonations',
                element: <AdminRoute>
                    <ManageDonations></ManageDonations>
                </AdminRoute>

            },
            {
                path: 'manageUsers',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
            },
            {
                path: 'manageRequests',
                element: <AdminRoute>
                    <ManageRequests></ManageRequests>
                </AdminRoute>
            },
            {
                path: 'featureDonations',
                element: <AdminRoute>
                    <FeatureDonations></FeatureDonations>
                </AdminRoute>
            },

        ]
    },
]);