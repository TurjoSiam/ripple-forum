import { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";


const PostDetails = () => {

    const [comment, setComment] = useState("");

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      // Handle the comment submission logic here
      console.log("Comment submitted:", comment);
      setComment("");
    };



    const {_id, authorImage, authorName, title, tag, time, upvote, downvote, description} = useLoaderData();


    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
            {/* Author Info */}
            <div className="flex items-center mb-4">
                <img
                    src={authorImage}
                    alt={`${authorName}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">@{authorName}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1"><FaRegClock /> {time}</p>
                </div>
            </div>

            {/* Post Title */}
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            {/* Post Description */}
            <p className="text-gray-700 mb-4">{description}</p>

            {/* Tag */}
            <div className="flex items-center gap-5 mb-4 text-gray-700 font-bold text-sm">
                <span>#{tag}</span>
                <span className="flex items-center gap-1"><BiUpvote /> {upvote}</span>
                <span className="flex items-center gap-1"><BiDownvote /> {downvote}</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mb-4">
                <button className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md">
                    Upvote
                </button>
                <button className="btn btn-primary bg-red-500 text-white px-4 py-2 rounded-md">
                    Downvote
                </button>
                <button className="btn btn-primary bg-gray-700 text-white px-4 py-2 rounded-md">
                    Share
                </button>
                <button className="btn btn-primary bg-yellow-500 text-white px-4 py-2 rounded-md">
                    Comments
                </button>
            </div>

            {/* Comment Section */}
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-4 mb-2 focus:outline-none focus:ring focus:ring-blue-500"
                    rows="3"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Comment
                </button>
            </form>
        </div>
    );
};

export default PostDetails;