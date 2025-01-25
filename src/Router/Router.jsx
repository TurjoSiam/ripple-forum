import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Membership from "../Pages/Membership/Membership";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Comments from "../Pages/Comments/Comments";
import MyProfile from "../Pages/Dashboard/Outlets/MyProfile";
import AddPost from "../Pages/Dashboard/Outlets/AddPost";
import MyPosts from "../Pages/Dashboard/Outlets/MyPosts";
import ManageUsers from "../Pages/Dashboard/Outlets/ManageUsers";
import Report from "../Pages/Dashboard/Outlets/Report";
import Announcement from "../Pages/Dashboard/Outlets/Announcement";



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
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: "/dashboard/myprofile",
                        element: <MyProfile></MyProfile>
                    },
                    {
                        path: "/dashboard/addpost",
                        element: <AddPost></AddPost>
                    },
                    {
                        path: "/dashboard/myposts",
                        element: <MyPosts></MyPosts>
                    },
                    {
                        path: "/dashboard/manageusers",
                        element: <ManageUsers></ManageUsers>
                    },
                    {
                        path: "/dashboard/report",
                        element: <Report></Report>
                    },
                    {
                        path: "/dashboard/announcement",
                        element: <Announcement></Announcement>
                    }
                ]
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