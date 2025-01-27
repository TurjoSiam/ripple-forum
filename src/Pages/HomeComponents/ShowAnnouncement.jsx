import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { IoMdTime } from "react-icons/io";


const ShowAnnouncement = () => {

    const axiosPublicAnnouncement = useAxiosPublic();
    const { data: announcements, isFetching } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublicAnnouncement.get("/announcements");
            return res.data;
        }
    })

    if (isFetching) {
        return <div className="col-span-9 w-full flex items-center justify-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }


    return (
        announcements?.length > 0 ?
            <>
                {
                    announcements.map(announcement => <div id="announcement" key={announcement?._id} className="bg-gradient-to-tr from-orange-100 to-green-100 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 my-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{announcement?.title}</h2>
                            <span className="text-sm text-gray-500 flex items-center gap-1"><IoMdTime />{announcement?.time}</span>
                        </div>
                        <p className="text-gray-600 mb-6">{announcement?.description}</p>
                        <div className="flex items-center">
                            <img
                                src={announcement?.authorImage}
                                alt="author image"
                                className="w-12 h-12 rounded-full border object-cover border-gray-300"
                            />
                            <div className="ml-4">
                                <p className="text-gray-800 font-medium">{announcement?.authorName}</p>
                                <p className="text-gray-500 text-sm">Author</p>
                            </div>
                        </div>
                    </div>)
                }
            </>
            :
            <></>
    );
};

export default ShowAnnouncement;