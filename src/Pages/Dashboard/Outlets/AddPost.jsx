import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const AddPost = () => {

    const { user } = useContext(AuthContext);

    const time = new Date().toJSON().slice(11, 16);

    const { register, handleSubmit, reset } = useForm();

    const axiosPublic = useAxiosPublic();
    const { data: tags } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get("/tags");
            return res.data;
        }
    })

    const { data: post, isFetching } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/posts/email/${user?.email}`);
            return res.data;
        }
    })

    const { data: author } = useQuery({
        queryKey: ['author'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/${user?.email}`);
            return res.data;
        }
    })


    const onSubmit = async (data) => {
        const res = await axiosPrivate.post('/posts', data)
        if (res.data.insertedId) {
            Swal.fire("Post Added Successfully!");
        }
        reset();
    }

    if (isFetching) {
        return <div className="col-span-9 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        author?.role === 'bronze' && post?.length > 4 ?
            <div className="col-span-9 w-5/6 mx-auto h-fit my-10 p-5 bg-orange-100 shadow-md shadow-orange-200 rounded-xl flex flex-col items-center gap-5">
                <h2 className="text-2xl text-center">You've reached your post limit. Please buy premium membership.</h2>
                <Link to="/membership" className="btn bg-orange-500 hover:bg-orange-400">Become a Member</Link>
            </div>
            :
            <div className="lg:my-10 col-span-9 w-11/12 md:w-5/6 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-8 bg-orange-50 p-16 rounded-3xl border border-cyan-200">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register('authorName')} defaultValue={user?.displayName} readOnly className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input {...register('email')} defaultValue={user?.email} readOnly type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input {...register('authorImage')} defaultValue={user?.photoURL} readOnly type="url" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author Image</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register('title')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Post Title</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select {...register('tag')} className="w-full select select-bordered">
                            <option value=''>Select a Tag</option>
                            {
                                tags?.map(tag => <option key={tag._id}>{tag?.value}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <input {...register('upvote', { valueAsNumber: true })} hidden type="number" name="upvote" value={0} id="" />
                        <input {...register('downvote', { valueAsNumber: true })} hidden type="number" name="downvote" value={0} id="" />
                        <input {...register('time')} hidden defaultValue={time} type="text" name="" id="" />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <textarea type="text" {...register('description')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Post Description</label>
                    </div>

                    <button type="submit" className="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Post</button>

                </form>
            </div>
    );
};

export default AddPost;