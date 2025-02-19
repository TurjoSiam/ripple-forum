import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Post from "./Post";
import { useRef, useState } from "react";
import { FaSortNumericDownAlt } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const Posts = () => {

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [clickedTag, setClickedTag] = useState('');

    const inputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = inputRef.current.value;
        setSearch(result);
        setClickedTag('');
    }

    const axiosPublic = useAxiosPublic();
    const { data, isFetching } = useQuery({
        queryKey: ['posts', search, sortBy],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?search=${search}&sortBy=${sortBy}`);
            return res.data;
        }
    })


    const { data: tags } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get("/tags");
            return res.data;
        }
    })

    if (isFetching) {
        return <div className="w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }


    return (
        <div className="flex flex-col-reverse lg:flex-row items-start gap-14 my-16 w-10/12 mx-auto">

            {/* cards */}
            <div className="md:w-3/4 w-full mx-auto flex flex-col items-center">
                {
                    data.map(item => <Post key={item._id} item={item}></Post>)
                }
                <Link to="/allpost" className="btn-main">See All Posts</Link>
            </div>

            {/* search and filter functionality */}
            <div className="md:w-1/4 w-full mx-auto flex flex-col gap-5 items-center">
                {/* filter */}
                <div className="flex items-center justify-center gap-1 w-11/12 lg:w-6/12 mx-auto my-2">
                    <button onClick={() => setSortBy('popularity')} className="btn bg-cyan-400 hover:bg-cyan-200 ">Sort By Popularity <FaSortNumericDownAlt /></button>
                    <button onClick={() => setSortBy('')} className="btn btn-outline text-cyan-700 hover:bg-cyan-100 hover:text-black">Reset <RiResetLeftFill /></button>
                </div>

                {/* search bar */}
                <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-5">
                    <input ref={inputRef} name="tag" defaultValue={clickedTag} type="text" placeholder="Search by Tag" className="input input-bordered w-full" />
                    <input className="btn-main" type="submit" value="Search" />
                </form>
                {/* tags */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {tags?.map((tag, index) => (
                        <div
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-200 text-black rounded-full shadow-sm hover:bg-blue-300 cursor-pointer transition"
                            onClick={() => setClickedTag(tag?.value)}
                        >
                            <span className="text-xs md:text-sm font-medium">{tag?.value}</span>
                        </div>
                    ))}
                </div>

            </div>


        </div>

    );
};

export default Posts;