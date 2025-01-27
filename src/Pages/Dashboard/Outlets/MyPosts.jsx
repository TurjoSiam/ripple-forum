import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";


const MyPosts = () => {

    const { user } = useContext(AuthContext);

    const axiosPublicPost = useAxiosPublic();
    const { data: posts, isFetching } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublicPost.get(`/posts/email/${user?.email}`);
            return res.data;
        }
    })

    if (isFetching) {
        return <div className="col-span-9 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }


    return (
        <div className="col-span-9 w-full md:w-5/6 mx-auto my-10 bg-orange-50 rounded-2xl border border-orange-300 p-7">
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead className="font-bold text-gray-700 text-lg">
                        <tr>
                            <th></th>
                            <th>Post Title</th>
                            <th>Number of Votes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, index) => <tr key={post._id}>
                                <th>{index + 1}</th>
                                <td className="font-bold">{post.title}</td>
                                <td className="flex items-center justify-center">
                                    <span className="flex items-center gap-1 mr-3"><BiUpvote /> {post?.upvote}</span>
                                    <span className="flex items-center gap-1"><BiDownvote /> {post?.downvote}</span>
                                </td>
                                <td>
                                    <Link to={`/comments/${post?._id}`} className="btn mr-2 bg-green-300 hover:bg-green-400">Comments</Link>
                                    <button className="btn bg-red-300 hover:bg-red-400">Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPosts;