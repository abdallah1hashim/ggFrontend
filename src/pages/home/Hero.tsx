import Logo from "../../components/Logo";
import HeroImg from "../../assets/pisces-portrait.jpg";

function Hero() {
  return (
    <section className="hero relative h-screen w-full from-black via-black to-transparent">
      <img
        src={HeroImg}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Logo />
      </div>
    </section>
  );
}

export default Hero;
