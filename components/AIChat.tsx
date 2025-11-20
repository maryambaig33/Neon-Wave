import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Map, Loader2, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGuide } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm your Virginia Beach Nightlife Concierge. Whether you're looking for a quiet cocktail, a lively dance floor, or local brews, I can help you find the perfect spot. How can I help you tonight?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | undefined>(undefined);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.debug("Geolocation access denied or failed", error);
        }
      );
    }
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGuide(userText, userLocation);
      
      const newAiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        groundingChips: response.groundingChunks
      };
      
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I'm having trouble connecting to our database right now. Please try again in a moment.",
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="p-5 bg-vb-blue text-white flex items-center gap-4 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
             <Sparkles className="w-32 h-32" />
        </div>
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm z-10">
          <MessageSquare className="w-6 h-6 text-vb-gold" />
        </div>
        <div className="z-10">
          <h2 className="font-serif font-bold text-xl">Concierge</h2>
          <p className="text-xs text-blue-200">Local insights • Powered by Gemini</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-5 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-vb-blue text-white rounded-2xl rounded-tr-sm'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm'
              } ${msg.isError ? 'border-red-200 bg-red-50 text-red-800' : ''}`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              
              {/* Grounding Chips */}
              {msg.groundingChips && msg.groundingChips.length > 0 && (
                <div className="mt-4 pt-3 border-t border-dashed border-gray-200/50 flex flex-wrap gap-2">
                  {msg.groundingChips.map((chunk, idx) => {
                    if (chunk.maps?.uri) {
                      return (
                        <a
                          key={idx}
                          href={chunk.maps.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            msg.role === 'user' 
                              ? 'bg-white/20 hover:bg-white/30 text-white' 
                              : 'bg-vb-sand hover:bg-gray-200 text-vb-blue'
                          }`}
                        >
                          <Map className="w-3.5 h-3.5" />
                          {chunk.maps.title || "View Map"}
                        </a>
                      );
                    }
                    if (chunk.web?.uri) {
                       return (
                        <a
                          key={idx}
                          href={chunk.web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            msg.role === 'user'
                              ? 'bg-white/20 hover:bg-white/30 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                          }`}
                        >
                          {chunk.web.title || "Source"}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start animate-pulse">
             <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3 shadow-sm">
                <Loader2 className="w-4 h-4 text-vb-teal animate-spin" />
                <span className="text-xs text-gray-500">Finding the best spots...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl py-3.5 pl-5 pr-14 focus:outline-none focus:border-vb-blue focus:ring-2 focus:ring-vb-blue/10 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-vb-blue text-white rounded-lg hover:bg-vb-teal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};