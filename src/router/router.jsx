import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddDonation from "../pages/Dashboard/Restaurant/AddDonation";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyDonation from "../pages/Dashboard/Restaurant/MyDonation";
import RequestCharityRole from "../pages/Dashboard/User/RequestCharityRole";
import StripeElementsWrapper from "../pages/Dashboard/User/StripeElementsWrapper";
import ManageRoleRequests from "../pages/Dashboard/Admim/ManageRoleRequests";
import TransactionHistory from "../pages/Dashboard/TransactionHistory";
import ManageDonations from "../pages/Dashboard/Admim/ManageDonations";
import AllDonations from "../pages/AllDonations";
import DonationDetails from "../pages/DonationDetails";
import axios from "axios";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'allDonations',
                element: <AllDonations></AllDonations>
            },
            {
                path: 'donationDetails/:id',
                // loader: ({ params }) => axios(`${import.meta.env.VITE_API_URL}/donation/${params.id}`),
                element: <DonationDetails></DonationDetails>
            },

        ]
    },
    {
        path: "/",
        element: <AuthLayout></AuthLayout>,
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
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'addDonation',
                element: <AddDonation></AddDonation>
            },
            {
                path: 'myDonations',
                element: <MyDonation></MyDonation>
            },
            {
                path: 'requestCharityRole',
                element: <StripeElementsWrapper>
                    <RequestCharityRole></RequestCharityRole>
                </StripeElementsWrapper>
            },
            {
                path: 'manageRoleRequests',
                element: <ManageRoleRequests></ManageRoleRequests>
            },
            {
                path: 'transactionHistory',
                element: <TransactionHistory></TransactionHistory>
            },
            {
                path: 'manageDonations',
                element: <ManageDonations></ManageDonations>
            },
        ]
    },
]);