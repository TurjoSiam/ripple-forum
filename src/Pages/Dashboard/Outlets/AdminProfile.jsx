import { useContext } from "react";
import admin from "../../../assets/admin.png"
import AuthContext from "../../../Context/AuthContext";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

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

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/users');
            return res.data;
        }
    })

    const axiosPublic = useAxiosPublic()
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allposts');
            return res.data;
        }
    })

    const { data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/comments');
            return res.data;
        }
    })

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const res = await axiosPrivate.post('/tags', data)
        if (res.data.insertedId) {
            Swal.fire("Tag Added Successfully!");
        }
        reset();
    }





    return (
        <div className="col-span-9 my-10">
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
            <div className="my-7 font-bold w-11/12 md:w-10/12 mx-auto p-5 flex items-center flex-wrap gap-3 justify-around bg-orange-50 rounded-2xl shadow-md shadow-orange-300">
                <h2>Total Users: {users?.length}</h2>
                <h2>Total Posts: {posts?.length}</h2>
                <h2>Total Comments: {comments?.length}</h2>
            </div>
            {/* new tag adding */}
            <div className="w-11/12 md:w-10/12 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-8 bg-orange-50 p-10 md:p-16 rounded-3xl border border-cyan-200">
                    <h2 className="font-bold text-xl text-center">Add a New Tag</h2>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register('value')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tag Value</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register('label')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tag Label</label>
                    </div>
                    <button type="submit" className="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Tag</button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;