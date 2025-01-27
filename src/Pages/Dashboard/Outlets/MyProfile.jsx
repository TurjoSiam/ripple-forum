import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import bronze from "../../../assets/bronze.png"
import gold from "../../../assets/gold.png"
import { IoMdTime } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const MyProfile = () => {

    const { user } = useContext(AuthContext);

    const axiosPrivate = useAxiosPrivate();
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    const axiosPublic = useAxiosPublic();
    const { data: post, isFetching } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/post/email/${user?.email}`);
            return res.data;
        }
    })


    if (isFetching) {
        return <div className="col-span-9 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
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
                {
                    data?.role === "bronze" ?
                        <>
                            <img src={bronze} alt="badge" />
                        </>
                        :
                        <>
                            <img src={gold} alt="badge" />
                        </>
                }
                <Link to="/editprofile" className="btn bg-orange-400 hover:bg-orange-300">Update</Link>
            </div>

            {/* post */}
            {
                post.map(item =>
                    <div key={item._id} className="flex-1 bg-orange-50 p-7 rounded-xl shadow-md shadow-orange-200
                     my-5 w-11/12 md:w-4/6 mx-auto">
                        <h3 className="text-lg font-semibold text-gray-800">{item?.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">@{item?.authorName}</p>
                        <p className="text-gray-700 text-sm mb-3">{item?.description}</p>
                        <div className="text-sm text-gray-600 flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <span className="bg-orange-200 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2">
                                    {item?.tag}
                                </span>
                                <span className="flex items-center gap-1"><IoMdTime />{item?.time}</span>
                            </div>
                            <div className="flex items-center sm:mt-0 sm:ml-auto">
                                <div className="flex items-center mr-4 text-gray-600">
                                    <span className="flex items-center gap-1"><FaRegComment />20</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="flex items-center gap-1 mr-3"><BiUpvote /> {item?.upvote}</span>
                                    <span className="flex items-center gap-1"><BiDownvote /> {item?.downvote}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MyProfile;