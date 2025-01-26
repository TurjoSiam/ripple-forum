import { useContext } from "react";
import admin from "../../../assets/admin.png"
import AuthContext from "../../../Context/AuthContext";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdminProfile = () => {

    const { user } = useContext(AuthContext);

    const axiosPrivate = useAxiosPrivate();
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    const axiosPublicUser = useAxiosPublic()
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublicUser.get('/users');
            return res.data;
        }
    })

    const axiosPublicPosts = useAxiosPublic()
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublicPosts.get('/allposts');
            return res.data;
        }
    })

    const axiosPublicComments = useAxiosPublic()
    const { data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosPublicComments.get('/comments');
            return res.data;
        }
    })

    





    return (
        <div className="col-span-9">
            <div className="flex items-center justify-between max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-4">
                <img
                    src={data?.photo}
                    alt="user photo"
                    className="w-16 h-16 rounded-full border-2 object-cover border-gray-300"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-bold text-gray-800">{data?.name}</h2>
                    <p className="text-sm text-gray-600">{data?.email}</p>
                </div>
                <img src={admin} alt="admin badge" />
            </div>
            <div className="my-7 font-bold w-10/12 mx-auto p-5 flex items-center justify-around bg-orange-50 rounded-2xl shadow-md shadow-orange-300">
                <h2>Total Users: {users?.length}</h2>
                <h2>Total Posts: {posts?.length}</h2>
                <h2>Total Comments: {comments?.length}</h2>  
            </div>
        </div>
    );
};

export default AdminProfile;