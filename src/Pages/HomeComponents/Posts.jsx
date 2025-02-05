import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Post from "./Post";
import { useRef, useState } from "react";
import { FaSortNumericDownAlt } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";


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
        <div className="relative">
            {/* search bar */}
            <form onSubmit={handleSubmit} className="flex items-center gap-1 absolute -top-16 md:-top-20 left-4 md:left-10 lg:left-24 border-2 border-orange-400 rounded-xl">
                <input ref={inputRef} name="tag" defaultValue={clickedTag} type="text" placeholder="Search by Tag" className="input-xs input-bordered w-full max-w-xs bg-transparent text-orange-200" />
                <input className="btn bg-orange-400 hover:bg-orange-300 border-none" type="submit" value="Search" />
            </form>
            {/* tags */}
            <div className="w-full bg-zinc-100 p-3 md:p-6 text-center rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Available Tags</h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {tags?.map((tag, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 bg-green-200 text-green-800 rounded-full shadow-sm hover:bg-green-300 cursor-pointer transition"
                            onClick={() => setClickedTag(tag?.value)}
                        >
                            <span className="text-xs md:text-sm font-medium">{tag?.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* cards of posts */}
            <div className="flex items-center justify-end gap-1 w-11/12 lg:w-6/12 mx-auto my-2">
                <button onClick={() => setSortBy('popularity')} className="btn bg-gradient-to-tr from-orange-200 to-green-100">Sort By Popularity <FaSortNumericDownAlt /></button>
                <button onClick={() => setSortBy('')} className="btn bg-gradient-to-tr from-red-200 to-green-100">Reset <RiResetLeftFill /></button>
            </div>
            <div className="w-11/12 md:w-6/12 mx-auto my-5">
                {
                    data.map(item => <Post key={item._id} item={item}></Post>)
                }
            </div>
        </div>

    );
};

export default Posts;