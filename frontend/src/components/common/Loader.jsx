const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-14 w-14 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin" />

        {/* Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-white">
            JobPortal
          </p>
          <p className="text-sm text-gray-400">
            Finding the right job for you...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
