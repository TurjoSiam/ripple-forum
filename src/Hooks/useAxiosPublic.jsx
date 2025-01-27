import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://ripple-turjo-siams-projects.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;