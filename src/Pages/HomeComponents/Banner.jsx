import banner from "../../assets/banner.jpg"

const Banner = () => {
    return (
        <div className="h-[600px]">
            <img className="w-full h-[600px] object-cover brightness-90" src={banner} alt="banner" />
        </div>
    );
};

export default Banner;