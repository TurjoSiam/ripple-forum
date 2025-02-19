import { useContext } from "react";
import gold from "../../assets/gold.png"
import AuthContext from "../../Context/AuthContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const Membership = () => {

    const { user } = useContext(AuthContext);

    const axiosPrivate = useAxiosPrivate();

    const handlePurchase = (email) => {
        Swal.fire({
            title: "Are you sure want to purchase?",
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
            },
            hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
            },
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Purchase!"
        }).then((result) => {
            const purchase = {
                role: 'gold'
            }
            if (result.isConfirmed) {
                axiosPrivate.patch(`/users/${email}`, purchase)
                .then(res => {
                    Swal.fire({
                        title: "Purchased!",
                        text: "You are now a Gold member.",
                        icon: "success"
                    });
                })
            }
        });
    }



    return (
        <div className="w-11/12 lg:w-6/12 mx-auto bg-purple-100 p-5 md:p-10 my-20 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Go Premium!</h2>
            <p className="text-gray-700 mb-4">
                Unlock exclusive benefits with a Premium Membership for just $50!
            </p>
            <ul className="list-disc list-inside mb-4">
                <li className="flex items-center gap-1">Receive a prestigious Gold Badge <img className="w-5" src={gold} alt="gold badge" /></li>
                <li>Post more than 5 articles on the website.</li>
            </ul>
            <button
                className="btn-main"
                onClick={() => handlePurchase(user?.email)}
            >
                Purchase Now
            </button>
        </div>
    );
};

export default Membership;