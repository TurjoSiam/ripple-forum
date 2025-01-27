import Banner from "../HomeComponents/Banner";
import Posts from "../HomeComponents/Posts";
import ShowAnnouncement from "../HomeComponents/ShowAnnouncement";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Posts></Posts>
            <ShowAnnouncement></ShowAnnouncement>
        </div>
    );
};

export default Home;