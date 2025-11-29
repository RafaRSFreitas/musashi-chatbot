import { useState, useEffect } from 'react';
import { Send, Menu, User, X, Trash2, History, MessageSquare } from 'lucide-react';

export default function App() {
  // 1. State for the conversation history (Array of objects)
  const [messages, setMessages] = useState([]);

  // 2. State for the input box (What the user is typing)
  const [inputText, setInputText] = useState('');

  // 3. State for loading status (Boolean)
  const [isLoading, setIsLoading] = useState(false);

  // 4. State for the side menu (Open/Close)
  const [showMenu, setShowMenu] = useState(false);

  // 5. State for login status (Mock login for now)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // THE EFFECT: Run this once when the app starts
  useEffect(() => {
    // 1. Create the welcome message object
    const welcomeMessage = {
      id: Date.now(),
      text: "I am Miyamoto Musashi. Ask me about strategy, philosophy, or the way of the sword.",
      type: 'bot',
      timestamp: new Date().toLocaleTimeString()
    };

    // 2. Add it to our messages state
    setMessages([welcomeMessage]);
  }, []); // <--- The empty array [] means "Only run this ONE time"

// 1. Handle typing in the input box
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 2. Handle sending the message
  const handleSendMessage = () => {
    // Prevent sending empty messages
    if (!inputText.trim()) return;

    // Create the User's message object
    const userMessage = {
      id: Date.now(),
      text: inputText,
      type: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    // Update the message history (Keep old messages + add new one)
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear the input field
    setInputText('');
    
    // Set loading state (we'll use this later for the bot response)
    setIsLoading(true);
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
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Miyamoto Musashi</h1>
      </header>

      {/* Chat Area */}
      <div style={{ 
        flex: 1, 
        width: '100%', 
        maxWidth: '600px', 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {/* Map through messages and display them */}
        {messages.map((msg) => (
          <div key={msg.id} style={{
            backgroundColor: msg.type === 'user' ? '#2b2b2b' : '#3d2b1f', // Dark grey for user, brownish for Musashi
            padding: '15px',
            borderRadius: '10px',
            borderLeft: msg.type === 'bot' ? '4px solid #8b4513' : 'none', // Brown accent for bot
            borderRight: msg.type === 'user' ? '4px solid #4a4a4a' : 'none'
          }}>
            <strong style={{ color: '#8b4513' }}>
              {msg.type === 'bot' ? 'Musashi' : 'You'}
            </strong>
            <p style={{ margin: '5px 0 0 0' }}>{msg.text}</p>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>{msg.timestamp}</small>
          </div>
        ))}
      </div>
    {/* Input Area */}
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
          value={inputText}                 // 1. Controlled by State
          onChange={handleInputChange}      // 2. Updates State
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Allow pressing Enter
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
          onClick={handleSendMessage}       // 3. Triggers the send logic
          disabled={isLoading}              // Disable if waiting for bot
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