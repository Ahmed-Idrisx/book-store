const Hero = () => {
  return (
    <div className="relative h-30 w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
};

export default Hero;
