
import { useLoaderData } from "react-router-dom";

import ReportedComments from "../../Components/ReportedComments";

const Comments = () => {

    const postComments = useLoaderData();

    return (
        <div className="w-11/12 md:w-9/12 mx-auto my-10 bg-orange-50 rounded-2xl border border-orange-300 p-7">
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead className="font-bold text-gray-700 text-lg">
                        <tr>
                            <th></th>
                            <th>Commenter Email</th>
                            <th>Comments</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postComments.map((comment, index) => <tr key={comment?._id}>
                                <th>{index + 1}</th>
                                <td>{comment?.email}</td>
                                <td>{comment?.comment}</td>
                                <td>
                                    <ReportedComments comments={comment}></ReportedComments>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;