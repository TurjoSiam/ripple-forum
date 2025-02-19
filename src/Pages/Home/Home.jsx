import Accordion from "../HomeComponents/Accordion";
import Banner from "../HomeComponents/Banner";
import Countdown from "../HomeComponents/Countdown";
import Posts from "../HomeComponents/Posts";
import ShowAnnouncement from "../HomeComponents/ShowAnnouncement";
import Steps from "../HomeComponents/Steps";
import Timeline from "../HomeComponents/Timeline";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Posts></Posts>
            <ShowAnnouncement></ShowAnnouncement>
            <Timeline></Timeline>
            <Steps></Steps>
            <Accordion></Accordion>
            <Countdown></Countdown>
        </div>
    );
};

export default Home;