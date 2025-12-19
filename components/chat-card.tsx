'use client';

import { SavedChat } from '@/types/chat';

interface ChatCardProps {
  chat: SavedChat;
  onClick: () => void;
  onDelete: () => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
}

export default function ChatCard({ chat, onClick, onDelete }: ChatCardProps) {
  const messageCount = chat.messages.length;
  const lastMessage = chat.messages[chat.messages.length - 1];
  const preview = lastMessage?.content.slice(0, 100) + (lastMessage?.content.length > 100 ? '...' : '');

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this chat?')) {
      onDelete();
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e4dc] cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-medium text-[#2a2a2a] text-[16px] line-clamp-2 flex-1">
          {chat.title}
        </h3>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Delete trip"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <p className="text-[14px] text-gray-500 line-clamp-2 mb-4">
        {preview}
      </p>

      <div className="flex items-center justify-between text-[13px] text-gray-400">
        <span>{messageCount} messages</span>
        <span>{formatDate(chat.updatedAt)}</span>
      </div>
    </div>
  );
}
