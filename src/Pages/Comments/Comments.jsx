
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const Comments = () => {

    const postComments = useLoaderData();

    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        console.log(data);
    }




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
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <select required {...register('report')} className="select mr-1">
                                            <option value="Offensive Language">Offensive Language</option>
                                            <option value="Spam Comment">Spam Comment</option>
                                            <option value="Bullying Behavior">Bullying Behavior</option>
                                        </select>
                                        <input type="submit" value="Report" className="btn bg-red-300 hover:bg-red-400" />
                                    </form>
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