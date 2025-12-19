import { useState, useCallback } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retryMessage: (messageIndex: number) => Promise<void>;
  clearMessages: () => void;
  loadMessages: (messages: Message[]) => void;
}

// Limit message history to avoid token limits
const MAX_HISTORY_MESSAGES = 20;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to send messages to API and handle streaming
  const streamResponse = useCallback(async (messagesToSend: Message[]) => {
    // Limit history sent to API
    const limitedMessages = messagesToSend.slice(-MAX_HISTORY_MESSAGES);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: limitedMessages,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    let accumulatedContent = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          if (data === '[DONE]') {
            break;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              // Stream was interrupted but we may have partial content
              console.warn('Stream error:', parsed.error);
              if (accumulatedContent) {
                // Keep partial content and add note
                accumulatedContent += '\n\n*(Response was interrupted)*';
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: accumulatedContent,
                  };
                  return newMessages;
                });
              }
            } else if (parsed.text) {
              accumulatedContent += parsed.text;

              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: accumulatedContent,
                };
                return newMessages;
              });
            }
          } catch {
            // Ignore invalid JSON lines
          }
        }
      }
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: 'user', content };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const assistantMessage: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await streamResponse([...messages, userMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages, streamResponse]);

  const retryMessage = useCallback(async (messageIndex: number) => {
    // Find the user message before the interrupted assistant message
    const targetMessage = messages[messageIndex];
    if (!targetMessage || targetMessage.role !== 'assistant') return;

    // Find the corresponding user message (should be the one before)
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0) return;

    const userMessage = messages[userMessageIndex];
    if (userMessage.role !== 'user') return;

    // Remove the interrupted assistant message and replace with empty one
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[messageIndex] = { role: 'assistant', content: '' };
      return newMessages;
    });

    setIsLoading(true);
    setError(null);

    try {
      // Get messages up to and including the user message
      const messagesUpToUser = messages.slice(0, messageIndex);
      await streamResponse(messagesUpToUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [messages, streamResponse]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const loadMessages = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    retryMessage,
    clearMessages,
    loadMessages,
  };
}
