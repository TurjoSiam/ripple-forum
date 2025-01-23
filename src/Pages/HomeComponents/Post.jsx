import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";


const Post = ({ item }) => {

    const { _id, authorImage, authorName, voteDifference, title, tag, time, description } = item;



    return (
        <Link to={`/post/${_id}`} className="w-full bg-white shadow-md shadow-emerald-200 rounded-lg p-4 flex flex-col sm:flex-row items-start mb-4">
            <img
                src={authorImage}
                alt={authorName}
                className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">@{authorName}</p>
                <p className="text-gray-700 text-sm mb-3">{description}</p>
                <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2">
                        {tag}
                    </span>
                    <span className="flex items-center gap-1"><IoMdTime />{time}</span>
                    <div className="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-0 sm:ml-auto">
                        <div className="flex items-center mr-4 text-gray-600">
                            <span className="flex items-center gap-1"><FaRegComment />20</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="flex items-center gap-1"><BiUpvote />{voteDifference}</span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default Post;