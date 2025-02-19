import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { Slide, toast } from "react-toastify";
import { IoIosNotifications } from "react-icons/io";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, signOutUser, loading } = useContext(AuthContext);

    const links = <>
        <li><NavLink className="px-0 mr-5 text-white" to="/">Home</NavLink></li>
        <li><NavLink className="px-0 mr-5 text-white" to="/allpost">All post</NavLink></li>
        {
            user && <>
                <li><NavLink className="px-0 mr-5 text-white" to="/membership">Membership</NavLink></li>
                <li><NavLink className="px-0 mr-5 text-white" to="/aboutus">About Us</NavLink></li>
            </>
        }
    </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Signout Successful', {
                    position: 'bottom-right',
                    transition: Slide
                });
                navigate("/login")
            })
            .catch(error => {
                console.log('ERROR occured', error.message);
                toast.error('Something Went Wrong', {
                    position: 'bottom-right',
                    transition: Slide
                })
            })
    }

    const axiosPublicAnnouncement = useAxiosPublic();
    const { data: announcements } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublicAnnouncement.get("/announcements");
            return res.data;
        }
    })


     // theme toggler
     const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
    
      // update state on toggle
      const handleToggle = (e) => {
        if (e.target.checked) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      };
    
      // set theme state in localstorage on mount & also update localstorage on state change
      useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        // add custom data-theme attribute to html tag required to update theme using DaisyUI
        document.querySelector("html").setAttribute("data-theme", localTheme);
      }, [theme]);




    if (loading) {
        return <div className="w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div className="lg:px-20 sticky top-0 bg-gradient-to-tr from-[#125B99] to-[#352A7D] z-10">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost font-bold primary-color text-3xl">Ripple</Link>
                    <div className="hidden md:flex">
                        <ul className="menu menu-horizontal ml-10 px-1">
                            {links}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">

                </div>
                <div className="navbar-end">

                    {/* theme toggle */}
                <button className="btn btn-square btn-ghost mr-2">
                    <label className="swap swap-rotate w-12 h-12">
                        <input type="checkbox" onChange={handleToggle} className="hidden"
                            // show toggle image based on localstorage theme
                            checked={theme === "light" ? false : true} />
                        {/* light theme sun image */}
                        <MdSunny className="w-5 h-5 swap-on text-white" />
                        {/* dark theme moon image */}
                        <IoMoon className="w-5 h-5 swap-off text-white" />
                    </label>
                </button>

                    {
                        user ?
                            <>
                                <a href="#announcement" className="btn mt-2 border-none btn-sm p-0 bg-transparent hover:bg-purple-600 mr-5 flex items-start gap-0"><IoIosNotifications className="text-2xl text-white" /><div className="badge w-1 border-none text-[10px] bg-orange-300 rounded-full">{announcements?.length}</div></a>
                                <details className="dropdown dropdown-end">
                                    <summary className="w-10 h-10 rounded-full border-none btn bg-transparent p-0">
                                        <img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL} alt="user photo" />
                                    </summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li className="btn btn-sm pointer-events-none">@{user?.displayName}</li>
                                        <li><Link className="btn btn-sm" to="/dashboard">Dashboard</Link></li>
                                        <li className="btn btn-sm" onClick={handleSignOut}>Logout</li>
                                    </ul>
                                </details>

                            </>
                            :
                            <>
                                <Link to="/register" className="btn-main">Join Us</Link>

                            </>
                    }
                </div>
            </div>
        </div>

    );
};

export default Navbar;