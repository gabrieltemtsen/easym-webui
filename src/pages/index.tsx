import { useState, FormEvent } from 'react';

type ChatMessage = {
  user?: string;
  text: string;
  action?: string;
};

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [userId] = useState('KUSHI');
  const [userName] = useState('Sammy');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add the user's message to the chat
    setChat(prev => [...prev, { text: input }]);
    setLoading(true);

    try {
      const res = await fetch('/api/easym/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, userId, userName }),
      });
      const data: ChatMessage[] = await res.json();
      setChat(prev => [...prev, ...data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1>Chat with EasyM</h1>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          minHeight: '300px',
          marginBottom: '1rem',
        }}
      >
        {chat.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            {msg.user && <strong>{msg.user}: </strong>}
            <span>{msg.text}</span>
            {msg.action && <em> (Action: {msg.action})</em>}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '80%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }} disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}
