import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";


const Dashboard = () => {
    return (
        <div className="grid grid-cols-12">
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;