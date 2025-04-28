import { useForm } from "react-hook-form";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const ReportedComments = ({ comments }) => {

    const { register, handleSubmit, reset } = useForm();

    const axiosPrivate = useAxiosPrivate();
    const onSubmit = async (data) => {
        const res = await axiosPrivate.post('/reports', data)
        if (res.data.insertedId) {
            Swal.fire("Report Added Successfully!");
        }
        reset();
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select required {...register('report')} className="select mr-1">
                    <option value="Offensive Language">Offensive Language</option>
                    <option value="Spam Comment">Spam Comment</option>
                    <option value="Bullying Behavior">Bullying Behavior</option>
                </select>
                <input defaultValue={comments.email} hidden {...register('email')} type="text" />
                <input defaultValue={comments.comment} hidden {...register('comment')} type="text" />
                <input defaultValue={comments._id} hidden {...register('commentId')} type="text" />
                <input type="submit" value="Report" className="btn bg-red-300 hover:bg-red-400" />
            </form>
        </div>
    );
};

export default ReportedComments;