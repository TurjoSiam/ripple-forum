import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Membership from "../Pages/Membership/Membership";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MyProfile from "../Pages/Dashboard/Outlets/MyProfile";
import AddPost from "../Pages/Dashboard/Outlets/AddPost";
import MyPosts from "../Pages/Dashboard/Outlets/MyPosts";
import ManageUsers from "../Pages/Dashboard/Outlets/ManageUsers";
import Report from "../Pages/Dashboard/Outlets/Report";
import Announcement from "../Pages/Dashboard/Outlets/Announcement";
import AdminProfile from "../Pages/Dashboard/Outlets/AdminProfile";
import EditProfile from "../Pages/EditProfile/EditProfile";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
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
                path: "/editprofile",
                element: <PrivateRoute><EditProfile></EditProfile></PrivateRoute>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: "/dashboard/myprofile",
                        element: <MyProfile></MyProfile>
                    },
                    {
                        path: "/dashboard/adminprofile",
                        element: <AdminProfile></AdminProfile>
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
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
                path: "/post/:id",
                element: <PostDetails></PostDetails>,
                loader: ({params}) => fetch(`https://ripple-turjo-siams-projects.vercel.app/post/${params.id}`)
            },
            {
                path: "/comments/:postId",
                element: <PrivateRoute><Comments></Comments></PrivateRoute>,
                loader: ({params}) => fetch(`https://ripple-turjo-siams-projects.vercel.app/comments/${params.postId}`)
            }
        ]
    },
]);

export default router;