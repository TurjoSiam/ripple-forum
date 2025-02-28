import Accordion from "../HomeComponents/Accordion";
import Banner from "../HomeComponents/Banner";
import Contact from "../HomeComponents/Contact";
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
            <Contact></Contact>
        </div>
    );
};

export default Home;