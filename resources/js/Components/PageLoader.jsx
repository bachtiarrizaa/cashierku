export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-cyan-600/70 border-t-transparent animate-spin-reverse"></div>
        <div className="absolute inset-4 bg-cyan-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}