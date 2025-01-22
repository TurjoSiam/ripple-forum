import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Post from "./Post";
import { useState } from "react";


const Posts = () => {

    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = e.target.tag.value;
        setSearch(result);
    }

    const axiosPublic = useAxiosPublic();
    const { data = [], isFetching } = useQuery({
        queryKey: ['posts', search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?search=${search}`);
            return res.data;
        }
    })

    if (isFetching) {
        return <div className="w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    const tags = ["Technology", "Science", "Travel", "Health", "Education"];



    return (
        <div className="relative">
            {/* search bar */}
            <form onSubmit={handleSubmit} className="flex items-center gap-1 absolute -top-20 left-24 border-2 border-orange-400 rounded-xl">
                <input name="tag" type="text" placeholder="Search by Tag" className="input input-bordered w-full max-w-xs bg-transparent text-orange-200" />
                <input className="btn bg-orange-400" type="submit" value="Search" />
            </form>
            {/* tags */}
            <div className="w-full bg-zinc-100 p-6 text-center rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Available Tags</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full shadow-sm"
                        >
                            <span className="text-sm font-medium">{tag}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* cards of posts */}
            <div className="w-6/12 mx-auto my-5">
                {
                    data.map(item => <Post key={item._id} item={item}></Post>)
                }
            </div>
        </div>

    );
};

export default Posts;