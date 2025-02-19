import { Link } from "react-router-dom";
import error from "../../assets/error.jpg"

const Error = () => {
    return (
        <div className="w-full flex justify-center my-12">
            <img src={error} alt="error page" />
            <Link to="/" className="btn-main mt-5">Back to Home</Link>
        </div>
    );
};

export default Error;