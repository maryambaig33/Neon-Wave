import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Map, Loader2 } from 'lucide-react';
import { ChatMessage, GroundingChunk } from '../types';
import { sendMessageToGuide } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hey! I'm NeonWave, your VB nightlife guide. Looking for a chill lounge, a wild club, or the best live music tonight? Just ask!"
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

  // Attempt to get geolocation on mount
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
    
    // Add user message
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
        text: "Sorry, my connection to the nightlife grid is a bit static-y right now. Try again?",
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
    <div className="flex flex-col h-[600px] bg-night-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-night-900/80 border-b border-white/10 flex items-center gap-3">
        <div className="p-2 bg-neon-pink/20 rounded-full">
          <Sparkles className="w-5 h-5 text-neon-pink" />
        </div>
        <div>
          <h2 className="font-bold text-white">NeonWave Concierge</h2>
          <p className="text-xs text-gray-400">Powered by Gemini 2.5 & Google Maps</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-neon-blue/10 text-white border border-neon-blue/30 rounded-tr-none'
                  : 'bg-night-700 text-gray-100 border border-white/5 rounded-tl-none'
              } ${msg.isError ? 'border-red-500/50 text-red-200' : ''}`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              
              {/* Grounding Chips (Maps Links) */}
              {msg.groundingChips && msg.groundingChips.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {msg.groundingChips.map((chunk, idx) => {
                    if (chunk.maps?.uri) {
                      return (
                        <a
                          key={idx}
                          href={chunk.maps.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-neon-blue border border-transparent hover:border-neon-blue/30 transition-colors"
                        >
                          <Map className="w-3 h-3" />
                          {chunk.maps.title || "View on Map"}
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
                          className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-gray-300 border border-transparent hover:border-white/20 transition-colors"
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
           <div className="flex justify-start">
             <div className="bg-night-700 border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-neon-pink animate-spin" />
                <span className="text-xs text-gray-400">Scanning the city...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-night-900/80 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about clubs, drink specials, or live bands..."
            className="w-full bg-night-800 border border-white/10 text-white placeholder-gray-500 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neon-blue/10 text-neon-blue rounded-lg hover:bg-neon-blue hover:text-night-900 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neon-blue transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
