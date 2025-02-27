
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loginLottie from "../../assets/loginLottie.json"


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";

    const { signInUser, signInWithGoogle } = useContext(AuthContext);

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result);
                toast.success('Login Successful', {
                    position: 'bottom-right',
                    transition: Slide
                })
                navigate(from);
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

    const handleGoogleSignin = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Login Successful', {
                    position: 'bottom-right',
                    transition: Slide
                })
                navigate(from)
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
        <div className="my-10 flex flex-col-reverse items-center lg:flex-row">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/3 mx-8 bg-violet-50 p-10 md:p-16 rounded-3xl border border-violet-200">
                <h1 className="mx-auto text-center text-[30px] font-bold mb-6">Sign In to Your Account</h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input {...register('email')} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input {...register('password')} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" className="btn-main">Sign In</button>
                <button onClick={handleGoogleSignin} className="btn w-full md:w-auto md:ml-2 bg-red-200 hover:bg-red-100"><FcGoogle /> Sign In with Google</button>
                <h2 className=" text-sm mt-6">Don't have an account'? <Link className="text-blue-600 hover:underline" to="/register">Register</Link></h2>
            </form>
            <div className="w-1/3">
                <Lottie className="max-w-xs lg:max-w-full" animationData={loginLottie}></Lottie>
            </div>
        </div>
    );
};

export default Login;