import { NavLink } from "react-router-dom";


const Sidebar = () => {
    

    return (
        <div className="col-span-3 border min-h-screen bg-teal-50 border-green-500">
            <NavLink to="/dashboard/myprofile" className="btn w-full bg-transparent">My Profile</NavLink>
            <NavLink to="/dashboard/addpost" className="btn w-full bg-transparent">Add Post</NavLink>
            <NavLink to="/dashboard/myposts" className="btn w-full bg-transparent">My Posts</NavLink>
        </div>
    );
};

export default Sidebar;