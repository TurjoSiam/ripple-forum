import Accordion from "../HomeComponents/Accordion";
import Contact from "../HomeComponents/Contact";
import Countdown from "../HomeComponents/Countdown";
import Posts from "../HomeComponents/Posts";
import ShowAnnouncement from "../HomeComponents/ShowAnnouncement";
import Steps from "../HomeComponents/Steps";
import Timeline from "../HomeComponents/Timeline";


const Home = () => {
    return (
        <div className="bg-blue-100 dark:bg-gray-600">
            <div className="grid grid-cols-2 gap-5">
                {/* left side options */}
                <div>
                    <h2>this is left side options</h2>
                </div>
                {/* right side options */}
                <div>
                    <Posts></Posts>
                    <ShowAnnouncement></ShowAnnouncement>
                    <Timeline></Timeline>
                    <Steps></Steps>
                    <Accordion></Accordion>
                    <Countdown></Countdown>
                    <Contact></Contact>
                </div>
            </div>
        </div>
    );
};

export default Home;