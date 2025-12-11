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
        overflowY: 'auto',
        alignItems: 'stretch'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
            flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
            maxWidth: '80%'
          }}>
            {/* Avatar */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#2b2b2b',
              border: '2px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <User size={24} color="#e0e0e0" />
            </div>
            
            {/* Message Bubble */}
            <div style={{
              backgroundColor: '#f5f5dc',
              padding: '12px 15px',
              borderRadius: '12px',
              border: '2px solid #8b7355',
              maxWidth: '70%',
              color: '#2b1810',
              position: 'relative'
            }}>
              {/* Speech bubble tail */}
              {msg.type === 'bot' ? (
                <>
                  <div style={{
                    position: 'absolute',
                    left: '-8px',
                    top: '10px',
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid #8b7355'
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '-5px',
                    top: '11px',
                    width: 0,
                    height: 0,
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                    borderRight: '7px solid #f5f5dc'
                  }} />
                </>
              ) : (
                <>
                  <div style={{
                    position: 'absolute',
                    right: '-8px',
                    top: '10px',
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '8px solid #8b7355'
                  }} />
                  <div style={{
                    position: 'absolute',
                    right: '-5px',
                    top: '11px',
                    width: 0,
                    height: 0,
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                    borderLeft: '7px solid #f5f5dc'
                  }} />
                </>
              )}
              
              <p style={{ margin: 0, lineHeight: '1.5', fontSize: '0.95rem' }}>{msg.text}</p>
            </div>
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
        borderTop: '1px solid #333',        
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