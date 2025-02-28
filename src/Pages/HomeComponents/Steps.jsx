

const Steps = () => {
    return (
        <div className="w-full mx-auto my-16 py-10 bg-blue-100 flex flex-col items-center gap-7 text-black dark:text-black">
            <h2 className="text-2xl font-bold text-center">How to Join Ripple?</h2>
            <ul className="steps steps-vertical lg:steps-horizontal mx-auto">
                <li className="step step-primary">Register</li>
                <li className="step step-primary">Login</li>
                <li className="step">Read and Share Thoughts</li>
                <li className="step">Purchase Premium Plan</li>
                <li className="step">Enjoy Premium Features</li>
            </ul>
        </div>
    );
};

export default Steps;