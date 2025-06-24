import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModelSelector from '../components/ModelSelector';

interface Message {
  id: string;
  sender: 'user' | 'ram' | 'laxman';
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-r1-distill-llama-70b');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGroqAPI = async (prompt: string, apiKey: string, senderName: string) => {
    const systemPrompt = senderName === 'Ram' 
      ? "You are Ram, a dedicated AI assistant who gives perfect answers with a touch of fun and engagement. You're intelligent, helpful, and make conversations enjoyable. Keep responses conversational and friendly. When other AIs respond, acknowledge them naturally in the conversation."
      : "You are Laxman, a funny and witty AI assistant who delivers perfect answers with humor and lightness. You add entertainment value while being accurate and helpful. Keep responses conversational and add appropriate humor. When other AIs respond, engage with them naturally like friends would.";

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process that request.';
    } catch (error) {
      console.error(`Error calling Groq API for ${senderName}:`, error);
      return `Sorry, I'm having trouble connecting right now. Please try again!`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create conversation context for AIs
    const conversationContext = messages.slice(-5).map(msg => 
      `${msg.sender === 'user' ? 'User' : msg.sender === 'ram' ? 'Ram' : 'Laxman'}: ${msg.content}`
    ).join('\n') + `\nUser: ${userMessage.content}`;

    try {
      // Get Ram's response first
      const ramResponse = await callGroqAPI(
        `Here's our conversation so far:\n${conversationContext}\n\nPlease respond as Ram. Keep it conversational and engaging.`,
        import.meta.env.VITE_GROQ_API_KEY_1 || '',
        'Ram'
      );

      const ramMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ram',
        content: ramResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, ramMessage]);

      // Small delay for natural conversation flow
      setTimeout(async () => {
        // Get Laxman's response (he can see Ram's response too)
        const updatedContext = conversationContext + `\nRam: ${ramResponse}`;
        
        const laxmanResponse = await callGroqAPI(
          `Here's our conversation so far:\n${updatedContext}\n\nPlease respond as Laxman. You can respond to both the user and Ram's message. Keep it funny and engaging while being helpful.`,
          import.meta.env.VITE_GROQ_API_KEY_2 || '',
          'Laxman'
        );

        const laxmanMessage: Message = {
          id: (Date.now() + 2).toString(),
          sender: 'laxman',
          content: laxmanResponse,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, laxmanMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error in conversation:', error);
      setIsLoading(false);
    }
  };

  // ... keep existing code (getSenderName, getSenderColor functions and JSX return)
  const getSenderName = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'You';
      case 'ram':
        return 'Ram';
      case 'laxman':
        return 'Laxman';
      default:
        return 'Unknown';
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'user':
        return 'bg-gray-800 text-white shadow-lg';
      case 'ram':
        return 'bg-white text-gray-800 border border-gray-200 shadow-md';
      case 'laxman':
        return 'bg-gray-100 text-gray-800 border border-gray-300 shadow-md';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium hidden sm:inline">Back to Home</span>
              <Home size={20} className="sm:hidden" />
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Triple Chat
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">AI Conversation Experience</p>
          </div>
          
          <div className="flex items-center">
            <ModelSelector 
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200 max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome to Triple Chat!</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm sm:text-base">
                    Start a conversation with Ram and Laxman. They'll both respond and interact with each other too!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12">
                  <div className="text-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <User className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Ram</p>
                    <p className="text-xs sm:text-sm text-gray-500">Dedicated & Intelligent</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <User className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Laxman</p>
                    <p className="text-xs sm:text-sm text-gray-500">Funny & Witty</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-6 ${getSenderColor(message.sender)} backdrop-blur-sm`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <span className="font-semibold text-sm">{getSenderName(message.sender)}</span>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 max-w-[75%] shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">AIs are thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-3 sm:space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message to Ram and Laxman..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white shadow-lg placeholder-gray-500 text-sm sm:text-base"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white rounded-full hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg hover:scale-105"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
