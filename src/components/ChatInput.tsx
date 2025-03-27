// components/ChatInput.tsx
import { useState, FormEvent, KeyboardEvent } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end">
      <textarea
        className="flex-grow text-black p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Type your message..."
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        style={{ minHeight: '44px', maxHeight: '120px' }}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className={`px-4 py-2 rounded-r-lg ${
          isLoading || !message.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition-colors`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending
          </span>
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
}