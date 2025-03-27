/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ChatInterface.tsx
import { ChatMessage } from '@/types/chat';
import { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      text,
      user: 'You',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('https://a120-2c0f-2a80-a31-eb10-c8d0-73d8-af61-e02c.ngrok-free.app/easym/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          userId: 'id1234', // You might want to make these configurable
          userName: 'Eddy',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const responseData = await response.json();
      
      // Add AI responses to chat
      responseData.forEach((message: any) => {
        const aiMessage: ChatMessage = {
          text: message.text,
          user: message.user || 'EasyM',
          action: message.action,
          timestamp: new Date().toISOString(),
        };
        
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        text: 'Sorry, there was an error processing your request. Please try again later.',
        user: 'System',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-gray-50 rounded-lg shadow-md">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">Chat with EasyM</h2>
      </div>
      
      <MessageList messages={messages} />
      
      <div className="p-4 border-t">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
      
      <div ref={messagesEndRef} />
    </div>
  );
}