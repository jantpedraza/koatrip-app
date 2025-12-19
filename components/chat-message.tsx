import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  onRetry?: () => void;
}

export default function ChatMessage({ role, content, isStreaming, onRetry }: ChatMessageProps) {
  const isUser = role === 'user';
  const wasInterrupted = content.includes('*(Response was interrupted)*');

  // Clean content for display (remove the interrupted marker)
  const displayContent = content.replace('\n\n*(Response was interrupted)*', '');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeInUp`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[#7c9885] text-white rounded-br-sm'
            : 'bg-white text-[#2a2a2a] rounded-bl-sm shadow-sm'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🐨</span>
            <span className="text-xs font-medium text-[#7c9885]">Koatrip</span>
          </div>
        )}
        <div className="text-[15px] leading-relaxed break-words">
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:my-2 prose-strong:text-[#2a2a2a]">
              <ReactMarkdown>{displayContent}</ReactMarkdown>
            </div>
          )}
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-[#7c9885] animate-pulse" />
          )}
        </div>

        {/* Retry button for interrupted responses */}
        {wasInterrupted && onRetry && (
          <div className="mt-3 pt-3 border-t border-[#e8e4dc]">
            <div className="flex items-center gap-2 text-[13px] text-orange-600 mb-2">
              <span>⚠️</span>
              <span>Response was interrupted</span>
            </div>
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 bg-[#7c9885] text-white text-[13px] font-medium rounded-lg transition-all hover:bg-[#6a8573] cursor-pointer"
            >
              <span>🔄</span>
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
