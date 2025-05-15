import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";


const PostAdd = () => {

    const time = new Date().toJSON().slice(11, 16);

    const { register, handleSubmit, reset } = useForm();

    const { user } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='mt-10 max-w-2xl mx-auto'>
            <form onSubmit={() => handleSubmit(onSubmit)}>
                <div className='flex items-start gap-3'>
                    <img className='w-12 h-12 object-cover rounded-full' src={user?.photoURL} alt="Profile picture" />
                    <textarea {...register('post')} placeholder='Share your thoughts !' className='p-5 w-full shadow-md rounded-lg min-h-20' name="post" id="post"></textarea>
                </div>
                <div className='flex items-center mt-2 justify-between'>
                    <div className="ml-16 space-x-1">
                        <label className="text-sm font-semibold" htmlFor="privacy">Privacy:</label>
                        <select {...register('privacy')} className="text-sm rounded-md" name="privacy" id="privacy">
                            <option value="Public">Public</option>
                            <option value="Friends">Friends</option>
                            <option value="Only me">Only me</option>
                        </select>
                    </div>
                    <button className='btn' type='submit'>Post</button>
                </div>
            </form>
        </div>
    );
};

export default PostAdd;