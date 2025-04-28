import { useForm } from "react-hook-form";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const ReportedComments = ({comments}) => {

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
            
        </div>
    );
};

export default ReportedComments;