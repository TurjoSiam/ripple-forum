import { useContext, useRef, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdDownloadDone } from "react-icons/md";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { FacebookShareButton, FacebookIcon } from "react-share";
import AuthContext from "../../Context/AuthContext";


const PostDetails = () => {

    const { user } = useContext(AuthContext);

    const [comment, setComment] = useState("");

    const revalidator = useRevalidator();

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Handle the comment submission logic here
        console.log("Comment submitted:", comment);
        setComment("");
    };

    const { _id, authorImage, authorName, title, tag, time, upvote, downvote, description } = useLoaderData();

    const axiosPrivate = useAxiosPrivate();

    const upButtonRef = useRef(null);
    const downButtonRef = useRef(null);

    const handleUpVote = async (id) => {
        const result = await axiosPrivate.patch(`/upvote/${id}`);
        console.log(result);
        revalidator.revalidate();
        upButtonRef.current.disabled = true;
    }

    const handleDownVote = async (id) => {
        const result = await axiosPrivate.patch(`/downvote/${id}`);
        console.log(result);
        revalidator.revalidate();
        revalidator.revalidate();
        downButtonRef.current.disabled = true;
    }

    const shareURL = `http://localhost:5173/post/${_id}`








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

            {/* Tag and vote count */}
            <div className="flex items-center gap-5 mb-4 text-gray-700 font-bold text-sm">
                <span>#{tag}</span>
                <span className="flex items-center gap-1"><BiUpvote /> {upvote}</span>
                <span className="flex items-center gap-1"><BiDownvote /> {downvote}</span>
            </div>

            {/* Buttons */}
            {
                user ?
                    <>
                        <div className="flex items-center gap-4 mb-4">
                            <button ref={upButtonRef} onClick={() => handleUpVote(_id)} className="btn px-4 py-2 rounded-md"><BiUpvote />
                                Upvote
                            </button>
                            <button ref={downButtonRef} onClick={() => handleDownVote(_id)} className="btn px-4 py-2 rounded-md"><BiDownvote />
                                Downvote
                            </button>
                            <FacebookShareButton url={shareURL}>
                                <FacebookIcon className="w-11 h-11 rounded-full" />
                            </FacebookShareButton>
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
                                className="btn px-6 py-2"><MdDownloadDone />
                                Comment
                            </button>
                        </form>
                    </>
                    :
                    <>
                        <div className="p-3 border bg-orange-100 mt-10">
                            <h2 className="text-xl text-center">Please <Link to="/login" className="underline text-blue-600">Login</Link> to comment, share and vote!</h2>
                        </div>
                    </>
            }


        </div>
    );
};

export default PostDetails;