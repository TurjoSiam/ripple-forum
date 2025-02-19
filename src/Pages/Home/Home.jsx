import Accordion from "../HomeComponents/Accordion";
import Banner from "../HomeComponents/Banner";
import Countdown from "../HomeComponents/Countdown";
import Posts from "../HomeComponents/Posts";
import ShowAnnouncement from "../HomeComponents/ShowAnnouncement";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Posts></Posts>
            <ShowAnnouncement></ShowAnnouncement>
            <Accordion></Accordion>
            <Countdown></Countdown>
        </div>
    );
};

export default Home;