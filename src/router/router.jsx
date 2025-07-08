import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddDonation from "../pages/Dashboard/Restaurant/AddDonation";
import PrivateRoute from "../routes/PrivateRoute";

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
                path: 'addDonation',
                element: <PrivateRoute>
                    <AddDonation></AddDonation>
                </PrivateRoute>
            }
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
]);