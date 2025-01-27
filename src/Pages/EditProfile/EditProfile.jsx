import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Swal from "sweetalert2";


const EditProfile = () => {

    const { user } = useContext(AuthContext);

    const { register, handleSubmit, reset } = useForm();

    const axiosPrivate = useAxiosPrivate();

    const onSubmit = async (data) => {
        const res = await axiosPrivate.patch(`/users/update/${user?.email}`, data)
        if (res.data.modifiedCount) {
            Swal.fire("Tag Added Successfully!");
        }
        reset();
    }



    return (
        <div className="w-8/12 mx-auto my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-8 bg-orange-50 p-10 md:p-16 rounded-3xl border border-cyan-200">
                <h2 className="font-bold text-xl text-center">Update Your Profile</h2>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" {...register('name')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="url" {...register('photo')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Photo URL</label>
                </div>
                <button type="submit" className="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;