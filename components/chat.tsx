import ChatMessage from './chat-message';
import TypingIndicator from './typing-indicator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  messages: Message[];
  onQuickQuestion: (question: string) => void;
  isLoading?: boolean;
  onRetry?: (messageIndex: number) => void;
}

export default function Chat({ messages, onQuickQuestion, isLoading, onRetry }: ChatProps) {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-[680px] w-full text-center animate-fadeInUp">
          <div className="text-[64px] mb-6 inline-block animate-bounceIn">
            🐨
          </div>
          <h1 className="font-[family-name:var(--font-family-serif)] text-[48px] font-light text-[#4a4a4a] mb-4 leading-tight">
            Let&apos;s plan your next trip
          </h1>
          <p className="text-[17px] text-gray-600 mb-8 font-normal">
            Tell me what you have in mind and I&apos;ll help you create the perfect itinerary
          </p>

          <div className="flex flex-wrap gap-3 justify-center opacity-70">
            <button
              className="px-5 py-2.5 bg-white border border-[#e8e4dc] rounded-[20px] text-[14px] text-[#4a4a4a] cursor-pointer transition-all duration-200 hover:bg-[#a8c4b0] hover:border-[#7c9885] hover:text-white hover:-translate-y-0.5"
              onClick={() => onQuickQuestion('Surprise me with a destination')}
            >
              🗺️ Surprise me with a destination
            </button>
            <button
              className="px-5 py-2.5 bg-white border border-[#e8e4dc] rounded-[20px] text-[14px] text-[#4a4a4a] cursor-pointer transition-all duration-200 hover:bg-[#a8c4b0] hover:border-[#7c9885] hover:text-white hover:-translate-y-0.5"
              onClick={() => onQuickQuestion('I\'m flexible with dates')}
            >
              📅 I&apos;m flexible with dates
            </button>
            <button
              className="px-5 py-2.5 bg-white border border-[#e8e4dc] rounded-[20px] text-[14px] text-[#4a4a4a] cursor-pointer transition-all duration-200 hover:bg-[#a8c4b0] hover:border-[#7c9885] hover:text-white hover:-translate-y-0.5"
              onClick={() => onQuickQuestion('I have a tight budget')}
            >
              💰 I have a tight budget
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 pb-32">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          role={msg.role}
          content={msg.content}
          isStreaming={isLoading && index === messages.length - 1 && msg.role === 'assistant'}
          onRetry={onRetry ? () => onRetry(index) : undefined}
        />
      ))}
      {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
        <TypingIndicator />
      )}
    </div>
  );
}
