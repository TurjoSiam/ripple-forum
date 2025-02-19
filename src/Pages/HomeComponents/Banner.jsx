import banner from "../../assets/banner.png"

const Banner = () => {
    return (
        <div className="h-[300px] md:h-[400px] lg:h-[600px]">
            <img className="w-full md:h-[400px] h-[300px] lg:h-[600px] brightness-90 object-cover" src={banner} alt="banner" />
        </div>
    );
};

export default Banner;