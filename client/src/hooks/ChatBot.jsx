import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  BookOpen,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';

// Main ChatBot Widget Component
const ChatBotWidget = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! 👋 I\'m your AI learning assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick action suggestions
  const quickActions = [
    { icon: HelpCircle, text: 'How do I start?', category: 'help' },
    { icon: BookOpen, text: 'Find resources', category: 'resources' },
    { icon: Award, text: 'View my progress', category: 'progress' },
    { icon: TrendingUp, text: 'Get recommendations', category: 'recommendations' },
  ];

  // Predefined responses based on keywords
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! I\'m here to help you with your learning journey. What would you like to know?';
    } else if (message.includes('start') || message.includes('begin')) {
      return 'Great! To get started:\n\n1. Browse our course catalog\n2. Select a topic you\'re interested in\n3. Watch the video and take the quiz\n4. Track your progress in your dashboard';
    } else if (message.includes('resource') || message.includes('material')) {
      return 'I can help you find learning resources! Are you looking for:\n\n• Video tutorials\n• Documentation\n• Practice exercises\n• Online courses\n\nJust let me know what topic you\'re interested in!';
    } else if (message.includes('progress') || message.includes('performance')) {
      return 'To view your progress:\n\n1. Go to your Dashboard\n2. Check the Progress section\n3. Review your quiz scores\n4. See your strong and weak topics\n\nYou can also view your learning history to track improvement over time!';
    } else if (message.includes('quiz') || message.includes('test')) {
      return 'Our quiz system helps you test your knowledge!\n\n• Take quizzes after watching videos\n• Get instant feedback\n• Receive personalized recommendations\n• Track your performance over time\n\nWould you like to start a quiz?';
    } else if (message.includes('help') || message.includes('support')) {
      return 'I\'m here to help! You can:\n\n• Ask me questions about the platform\n• Get learning recommendations\n• Find resources for any topic\n• Get technical support\n\nWhat specific help do you need?';
    } else if (message.includes('recommend') || message.includes('suggestion')) {
      return 'Based on your learning patterns, I recommend:\n\n1. Review your weak topics from recent quizzes\n2. Try the recommended resources in your results\n3. Set daily learning goals\n4. Join study groups for collaborative learning\n\nWould you like specific course recommendations?';
    } else if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! Feel free to ask me anything else. Happy learning! 😊';
    } else {
      return 'I understand you\'re asking about: "' + userMessage + '"\n\nI can help you with:\n• Finding learning resources\n• Taking quizzes\n• Tracking progress\n• Getting recommendations\n• Technical support\n\nCould you be more specific about what you need?';
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action.text);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`mb-4 transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          } bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">AI Learning Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                {isMinimized ? (
                  <Maximize2 className="w-5 h-5 text-white" />
                ) : (
                  <Minimize2 className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'bg-slate-800 border border-slate-700'
                      } rounded-2xl p-3 shadow-lg`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'bot' && (
                          <Bot className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-white text-sm whitespace-pre-line leading-relaxed">
                            {message.text}
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        {message.type === 'user' && (
                          <User className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3 flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-400" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-4 py-3 bg-slate-800 border-t border-slate-700">
                  <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(action)}
                        className="flex items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-xs text-gray-300"
                      >
                        <action.icon className="w-4 h-4 text-purple-400" />
                        <span>{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ''}
                    className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl transition shadow-lg"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by AI • Press Enter to send
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          
          {/* Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need help? Chat with us!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
          </div>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-20"></div>
        </button>
      )}
    </div>
  );
};

// Export the component
export default ChatBotWidget;

// Usage Example in App.jsx or any page:
/*
import ChatBotWidget from './components/ChatBotWidget';

function App() {
  return (
    <div>
      <YourPageContent />
      <ChatBotWidget position="bottom-right" />
    </div>
  );
}
*/

// For integration across multiple pages with React Router:
/*
// In your App.jsx or main layout component:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBotWidget from './components/ChatBotWidget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
      
      {/* ChatBot appears on ALL pages *\/}
      <ChatBotWidget position="bottom-right" />
    </Router>
  );
}
*/