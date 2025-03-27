// components/MessageList.tsx

type MessageListProps = {
  messages: ChatMessage[];
};

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-grow p-6 overflow-y-auto flex items-center justify-center text-gray-500">
        <p>Send a message to start chatting with EasyM</p>
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`mb-4 ${message.user === 'You' ? 'text-right' : 'text-left'}`}
        >
          <div className="inline-block max-w-[80%]">
            <div 
              className={`p-3 rounded-lg ${
                message.user === 'You' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : message.user === 'System'
                    ? 'bg-red-100 text-red-800 rounded-bl-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{message.user}</p>
              <div className="whitespace-pre-wrap">{message.text}</div>
              {message.action && (
                <div className="mt-1 text-xs opacity-75">
                  Action: {message.action}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { ChatMessage } from '@/types/chat';
