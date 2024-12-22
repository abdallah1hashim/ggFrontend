import video from "../../../assets/3888252-uhd_2732_1440_25fps.mp4";
import logo from "../../../assets/logo.png";

function Hero() {
  return (
    <section className="hero to-black-900 relative h-full w-full overflow-hidden">
      {/* Background Content */}
      <div className="relative">
        <video
          className="relative z-0 h-full w-full object-cover"
          src={video}
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute inset-0 z-10 h-full bg-gradient-to-b from-transparent via-transparent to-primary-800"></div>
        <div className="absolute left-[50%] top-[50%] h-40 w-40 translate-x-[-50%] translate-y-[-50%] rounded-full">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          <span className="relative -left-8 text-nowrap py-8 text-center text-4xl font-bold">
            GENTLE GEN
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
