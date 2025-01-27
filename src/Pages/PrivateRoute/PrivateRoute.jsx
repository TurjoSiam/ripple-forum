import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="col-span-9 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (user) {
        return children;
    }


    return <Navigate to="/login" state={location?.pathname}></Navigate>
};


export default PrivateRoute;