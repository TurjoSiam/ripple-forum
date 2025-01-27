import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { Slide, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Register = () => {

    const axiosPublic = useAxiosPublic();

    const { createUser, userUpdateWhenSignin, signInWithGoogle, signOutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result);
                userUpdateWhenSignin({
                    displayName: data.name,
                    photoURL: data.photo
                })
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                            role: 'bronze'
                        }
                        axiosPublic.post("/users", userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    toast.success('Registration Successful', {
                                        position: 'bottom-right',
                                        transition: Slide
                                    });
                                    signOutUser()
                                        .then(() => {
                                            navigate("/login")
                                        });
                                }
                            })


                    })
            })
            .catch(error => {
                console.log('ERROR', error.message);
                toast.error('Something went wrong', {
                    position: 'bottom-right',
                    transition: Slide
                })
            })
    }

    const handleGoogleSignin = () => {
        signInWithGoogle()
            .then((res) => {
                console.log(res);
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photo: res.user.photoURL,
                    role: 'bronze'
                }
                axiosPublic.post("/users", userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            console.log(res.data);
                            toast.success('Login Successful', {
                                position: 'bottom-right',
                                transition: Slide
                            })
                            navigate("/")
                        }
                    })
            })
            .catch(error => {
                console.log('ERROR', error.message);
                toast.error('Something went wrong', {
                    position: 'bottom-right',
                    transition: Slide
                })
                navigate("/login");
            })
    }

    return (
        <div className="my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/3 mx-8 bg-cyan-50 p-10 md:p-16 rounded-3xl border border-cyan-200">
                <h1 className="mx-auto text-center text-[30px] font-bold mb-6">Create Your Account</h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" {...register('name')} name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input {...register('email')} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input {...register('photo')} type="url" name="photo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Photo URL</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input {...register('password', { required: 'Email is required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long" } })} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    {
                        errors.password && (
                            <p className="text-red-500 text-xs italic">{errors.password.message}</p>
                        )
                    }
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                <button onClick={handleGoogleSignin} className="btn w-full md:w-auto md:ml-2 mt-1 md:mt-0 bg-blue-200"><FcGoogle /> Sign In with Google</button>
                <h2 className=" text-sm mt-6">Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Login</Link></h2>
            </form>
        </div>
    );
};

export default Register;