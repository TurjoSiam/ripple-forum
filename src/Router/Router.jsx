import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Membership from "../Pages/Membership/Membership";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Comments from "../Pages/Comments/Comments";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/membership",
                element: <Membership></Membership>
            },
            {
                path: "/post/:id",
                element: <PostDetails></PostDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/post/${params.id}`)
            },
            {
                path: "/comments/:id",
                element: <Comments></Comments>
            }
        ]
    },
]);

export default router;