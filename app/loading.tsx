export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Glowing AA Logo Animation */}
      <div className="flex space-x-1 text-6xl font-mono font-bold animate-pulse tracking-wider">
        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">&lt;A</span>
        <span className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]">A /&gt;</span>
      </div>
      
      {/* Techy Loading Text */}
      <p className="mt-8 text-sm font-mono text-gray-500 animate-bounce tracking-widest uppercase">
        Initializing...
      </p>
    </div>
  );
}