import { Link } from "react-router-dom";

const Countdown = () => {
    return (
        <div className="w-full mx-auto my-16 py-8 bg-cyan-200 flex flex-col items-center gap-5">
            <h2 className="text-xl font-bold text-center">
                Limited Time Left! Upgrade to Premium for Exclusive Features!
            </h2>
            <Link to="/membership" className="btn-main">
                Be a Premium Member
            </Link>
            <div className="flex gap-5 w-10/12 justify-center text-center">
                <div>
                    <span className="countdown font-mono text-4xl">
                        <span style={{ "--value": 7 }}></span>
                    </span>
                    <div>days</div>
                </div>
                <div>
                    <span className="countdown font-mono text-4xl">
                        <span style={{ "--value": 10 }}></span>
                    </span>
                    <div>hours</div>
                </div>
                <div>
                    <span className="countdown font-mono text-4xl">
                        <span style={{ "--value": 24 }}></span>
                    </span>
                    <div>min</div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
