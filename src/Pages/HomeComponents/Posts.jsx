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




    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center gap-1 absolute -top-24 left-24">
                <input name="tag" type="text" placeholder="Search by Tag" className="input input-bordered w-full max-w-xs" />
                <input className="btn" type="submit" value="Search" />
            </form>
            <div className="w-6/12 mx-auto my-5">
                {
                    data.map(item => <Post key={item._id} item={item}></Post>)
                }
            </div>
        </div>

    );
};

export default Posts;