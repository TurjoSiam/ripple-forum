import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useRef, useState } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const ManageUsers = () => {

    const [search, setSearch] = useState("");

    const inputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = inputRef.current.value;
        console.log(result);
        setSearch(result);
    }

    const axiosPrivate = useAxiosPrivate()
    const { data: users, isFetching, refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users?search=${search}`);
            return res.data;
        }
    })

    const handleAdmin = (id) => {
        Swal.fire({
            title: "Are you sure want to make Admin?",
            showClass: {
                popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `
            },
            hideClass: {
                popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `
            },
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            const newRole = {
                role: "admin"
            }
            if (result.isConfirmed) {
                axiosPrivate.patch(`/users/makeadmin/${id}`, newRole)
                    .then(res => {
                        Swal.fire({
                            title: "Success!",
                            text: "The user now is an Admin.",
                            icon: "success"
                        });
                        refetch();
                    })
                    
            }
        });

    }
    

    if (isFetching) {
        return <div className="col-span-9 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div className="col-span-9 text-center">
            <div className="w-11/12 md:w-5/6 mx-auto my-10 bg-orange-50 rounded-2xl border border-orange-300 p-7">
                <form onSubmit={handleSubmit} className="flex items-center gap-1 mb-5 rounded-xl">
                    <input ref={inputRef} name="search" type="text" placeholder="Search by Username" className="input input-bordered w-full max-w-xs" />
                    <input className="btn bg-orange-500 hover:bg-orange-400" type="submit" value="Search" />
                </form>
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        {/* head */}
                        <thead>
                            <tr className="text-lg font-bold">
                                <th></th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Make Admin</th>
                                <th>Membership Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user?._id}>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td><button disabled={user?.role === "admin"} onClick={() => handleAdmin(user?._id)} className="btn bg-orange-400 hover:bg-orange-300">Make Admin</button></td>
                                    <td>{user?.role}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;