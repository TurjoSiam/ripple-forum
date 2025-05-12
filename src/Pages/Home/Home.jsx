import Accordion from "../HomeComponents/Accordion";
import Contact from "../HomeComponents/Contact";
import Countdown from "../HomeComponents/Countdown";
import Posts from "../HomeComponents/Posts";
import ShowAnnouncement from "../HomeComponents/ShowAnnouncement";
import Steps from "../HomeComponents/Steps";
import Timeline from "../HomeComponents/Timeline";


const Home = () => {
    return (
        <div className="bg-blue-100 dark:bg-gray-600 mx-auto">
            <div className="grid grid-cols-6 gap-5">
                {/* left side options */}
                <div className="col-span-1">
                    <h2>this is left side options</h2>
                </div>
                {/* middle side options */}
                <div className="col-span-4">
                    <Posts></Posts>
                    <ShowAnnouncement></ShowAnnouncement>
                    <Timeline></Timeline>
                    <Steps></Steps>
                    <Accordion></Accordion>
                    <Countdown></Countdown>
                    <Contact></Contact>
                </div>
                {/* right side options */}
                <div className="col-span-1">
                    <h2>this is right side options</h2>
                </div>
            </div>
        </div>
    );
};

export default Home;