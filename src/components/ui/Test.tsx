const MonochromeGradientBackground = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Base monochrome gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-gray-900">
        {/* Single, very subtle lightning effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-5 motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />

        {/* Single ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-gray-400/5 blur-3xl motion-safe:animate-[pulse_8s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto p-8">
        <h1 className="mb-4 text-4xl font-bold text-white">Subtle Gradient</h1>
        <p className="text-gray-200">
          This is your content area. The background features a minimal
          monochrome gradient.
        </p>
      </div>
    </div>
  );
};

export default MonochromeGradientBackground;
