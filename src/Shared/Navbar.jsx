import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { Slide, toast } from "react-toastify";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, signOutUser } = useContext(AuthContext);

    const links = <>
        <li><NavLink className="px-0" to="/">Home</NavLink></li>
        <li><NavLink className="px-0" to="/allservices">Services</NavLink></li>
        <li><button disabled className="btn">Inbox<div className="badge">99</div></button></li>
    </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Signout Successful', {
                    position: 'bottom-right',
                    transition: Slide
                });
                navigate("/signin")
            })
            .catch(error => {
                console.log('ERROR occured', error.message);
                toast.error('Something Went Wrong', {
                    position: 'bottom-right',
                    transition: Slide
                })
            })
    }

    return (
        <div className="lg:px-20 sticky top-0 bg-teal-50 z-10">
            <div className="navbar bg-base-100">
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
                    <a className="btn btn-ghost text-xl">Ripple</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <details className="dropdown">
                                    <img src={user?.photoURL} alt="user photo" />
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li>{user?.displayName}</li>
                                        <li><Link to="/dashboard">Dashboard</Link></li>
                                        <li onClick={handleSignOut}>Logout</li>
                                    </ul>
                                </details>
                            </>
                            :
                            <>
                                <Link to="/login" className="btn">Join Us</Link>

                            </>
                    }
                </div>
            </div>
        </div>

    );
};

export default Navbar;