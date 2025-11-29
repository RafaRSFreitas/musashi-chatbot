import { useState, useEffect, useRef } from 'react';
import { Send, Menu, User, X, Trash2, History, MessageSquare } from 'lucide-react';

export default function App() {
  // State for the app
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // used for scrolling to bottom
  const messagesEndRef = useRef(null);

  // Set initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: "I am Miyamoto Musashi. Ask me about strategy, philosophy, or the way of the sword.",
      type: 'bot',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages([welcomeMessage]);
  }, []);

  // scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    // don't send if empty
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      type: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    // add user message
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // fake delay for the bot response
    setTimeout(() => {
      
      const botResponse = {
        id: Date.now() + 1,
        text: "Hey there! (Mock answer while the API is not connected)",
        type: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);

    }, 1000); 
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh', 
      color: '#e0e0e0',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Header */}
      <header style={{ 
        padding: '20px', 
        borderBottom: '1px solid #333', 
        width: '100%', 
        textAlign: 'center' 
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>⚔️ Miyamoto Musashi</h1>
      </header>

      {/* Message List */}
      <div style={{ 
        flex: 1, 
        width: '100%', 
        maxWidth: '600px', 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        overflowY: 'auto'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            backgroundColor: msg.type === 'user' ? '#2b2b2b' : '#3d2b1f',
            padding: '15px',
            borderRadius: '10px',
            borderLeft: msg.type === 'bot' ? '4px solid #8b4513' : 'none',
            borderRight: msg.type === 'user' ? '4px solid #4a4a4a' : 'none',
            alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}>
            <strong style={{ color: '#8b4513', display: 'block', marginBottom: '5px' }}>
              {msg.type === 'bot' ? 'Musashi' : 'You'}
            </strong>
            <p style={{ margin: 0, lineHeight: '1.5' }}>{msg.text}</p>
            <small style={{ color: '#666', fontSize: '0.7rem', display: 'block', marginTop: '5px' }}>
              {msg.timestamp}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div style={{ 
        width: '100%', 
        maxWidth: '600px', 
        padding: '20px',
        display: 'flex',
        gap: '10px',
        borderTop: '1px solid #333'
      }}>
        <input 
          type="text" 
          value={inputText}                 
          onChange={handleInputChange}      
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #444',
            backgroundColor: '#2b2b2b',
            color: 'white',
            outline: 'none'
          }}
        />
        <button 
          onClick={handleSendMessage}       
          disabled={isLoading}              
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#8b4513',
            color: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isLoading ? '...' : <Send size={20} />}
        </button>
      </div>

    </div>
  );
}