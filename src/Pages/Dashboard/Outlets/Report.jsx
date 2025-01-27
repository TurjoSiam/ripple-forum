import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";


const Report = () => {

    const axiosPrivate = useAxiosPrivate();
    const { data: reports } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosPrivate.get("/reports");
            return res.data;
        }
    })

    console.log(reports);

    return (
        <div className="col-span-9 text-center bg-orange-50 p-10 w-4/6 my-10 mx-auto">
            {
                reports?.map((report) =>
                    <li className="space-x-2" key={report._id}> <span className="bg-green-50">Reported Comment Id: {report?.commentId}</span>: <span className="bg-red-100">Feedback: {report?.report}</span></li>
                )
            }
        </div>
    );
};

export default Report;