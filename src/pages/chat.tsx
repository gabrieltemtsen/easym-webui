// pages/chat.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import ChatInterface from '../components/ChatInterface';

const ChatPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat with EasyM</title>
        <meta name="description" content="Chat with our AI assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">EasyM Assistant</h1>
        
        <div className="w-full max-w-2xl">
          <ChatInterface />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by EasyM AI - Your financial assistant</p>
        </div>
      </main>
    </>
  );
};

export default ChatPage;