import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";


const Sidebar = () => {

    const { user } = useContext(AuthContext);

    const axiosPrivate = useAxiosPrivate();
    const { data, isFetching } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    if (isFetching) {
        return <div className="col-span-3 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }


    return (
        data?.role === "admin" ?
            <>
                <div className="col-span-3 border min-h-screen bg-gradient-to-tr from-[#125B99] to-[#352A7D] border-purple-500">
                    <NavLink to="/dashboard/adminprofile" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">Admin Profile</NavLink>
                    <NavLink to="/dashboard/manageusers" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">Manage Users</NavLink>    
                    <NavLink to="/dashboard/announcement" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">Make Announcement</NavLink>
                    <NavLink to="/dashboard/report" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">Reported Comments/ Activities</NavLink>
                </div>
            </>
            :
            <>
                <div className="col-span-3 border min-h-screen bg-gradient-to-tr from-[#125B99] to-[#352A7D] border-purple-500">
                    <NavLink to="/dashboard/myprofile" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">My Profile</NavLink>
                    <NavLink to="/dashboard/addpost" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">Add Post</NavLink>
                    <NavLink to="/dashboard/myposts" className="btn border-none hover:border-none text-white w-full hover:bg-blue-800 bg-transparent">My Posts</NavLink>
                </div>
            </>

    );
};

export default Sidebar;