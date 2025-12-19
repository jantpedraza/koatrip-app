interface UserInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function UserInput({ value, onChange, onSend, disabled }: UserInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-[260px] right-0 border-t border-[#e8e4dc] bg-white/80 backdrop-blur-sm z-10">
      <div className="max-w-[800px] mx-auto px-8 py-6">
        <div className="relative bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(124,152,133,0.15)]">
          <textarea
            className="w-full min-h-[60px] max-h-[200px] p-4 pr-16 border-none rounded-[24px] text-[15px] leading-relaxed text-[#2a2a2a] resize-none outline-none bg-transparent placeholder:text-gray-400 font-[family-name:var(--font-family-sans)] disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={disabled ? "Waiting for response..." : "Type your message..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <button
            className="absolute bottom-3 right-3 w-10 h-10 bg-[#7c9885] rounded-full text-white text-[18px] flex items-center justify-center transition-all duration-300 hover:bg-[#4a4a4a] hover:scale-110 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={onSend}
            disabled={!value.trim() || disabled}
            aria-label="Send message"
          >
            {disabled ? <span className="animate-spin">⏳</span> : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
}
