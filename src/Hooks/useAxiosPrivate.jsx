import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";


const axiosPrivate = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosPrivate = () => {

    const navigate = useNavigate();
    const {signOutUser} = useContext(AuthContext);

    axiosPrivate.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    axiosPrivate.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosPrivate;
}


export default useAxiosPrivate;