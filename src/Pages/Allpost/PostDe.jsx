import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PostDe = ({ item }) => {

    const { _id, authorImage, authorName, voteDifference, title, tag, time, description } = item;

    const axiosPublicComments = useAxiosPublic();
    const { data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosPublicComments.get(`/comments/${_id}`);
            return res.data;
        }
    })

    return (
        <Link to={`/post/${_id}`} className="w-full bg-white shadow-md shadow-purple-200 rounded-lg p-4 flex flex-row items-start mb-4">
            <img
                src={authorImage}
                alt={authorName}
                className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">@{authorName}</p>
                <p className="text-gray-700 text-sm mb-3">{description}</p>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="bg-purple-200 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2">
                            {tag}
                        </span>
                        <span className="flex items-center gap-1"><IoMdTime className="text-orange-600" />{time}</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex items-center mr-4 text-gray-600">
                            <span className="flex items-center gap-1"><FaRegComment className="text-blue-600" />{comments?.length}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="flex items-center gap-1"><BiUpvote className="text-green-600" />{voteDifference}</span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default PostDe;