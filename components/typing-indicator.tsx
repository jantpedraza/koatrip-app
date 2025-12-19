export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 animate-fadeInUp">
      <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🐨</span>
          <span className="text-xs font-medium text-[#7c9885]">Koatrip</span>
        </div>
        <div className="flex items-center gap-1 py-1">
          <span className="w-2 h-2 bg-[#7c9885] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-[#7c9885] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-[#7c9885] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
