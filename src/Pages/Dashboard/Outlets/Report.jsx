import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { Slide, toast } from "react-toastify";


const Report = () => {

    const axiosPrivate = useAxiosPrivate();
    const { data: reports } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosPrivate.get("/reports");
            return res.data;
        }
    })

    const handleClick = async (id) => {
        const res = await axiosPrivate.delete(`/reports/${id}`);
        if (res.data.deletedCount > 0) {
            toast.success("Comment deleted successfully,", {
                position: "bottom-right",
                transition: Slide
            });
            window.location.reload();
        }
    }


    return (
        <div className="col-span-9 text-center bg-orange-50 p-10 w-full my-7 mx-7">
            <h1 className="text-3xl font-bold text-center mb-10">Reported Comments</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Comment</th>
                        <th>Cause</th>
                        <th>Commenter Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reports?.map((report, index) => <tr key={report?._id}>
                            <th>{index + 1}</th>
                            <td>{report?.comment}</td>
                            <td>{report?.report}</td>
                            <td>{report?.email}</td>
                            <td><button onClick={()=> handleClick(report.commentId)} className="btn btn-error btn-md">Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Report;