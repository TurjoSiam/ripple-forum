import gold from "../../assets/gold.png"

const Membership = () => {
    return (
        <div className="w-6/12 mx-auto bg-green-50 p-10 my-20 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Go Premium!</h2>
            <p className="text-gray-700 mb-4">
                Unlock exclusive benefits with a Premium Membership for just $50!
            </p>
            <ul className="list-disc list-inside mb-4">
                <li className="flex items-center gap-1">Receive a prestigious Gold Badge <img className="w-5" src={gold} alt="gold badge" /></li>
                <li>Post more than 5 articles on the website.</li>
            </ul>
            <button
                className="btn py-2 px-4"
                onClick={() => {
                    // Handle purchase logic here (e.g., redirect to payment gateway)
                    console.log('Purchase button clicked');
                }}
            >
                Purchase Now
            </button>
        </div>
    );
};

export default Membership;