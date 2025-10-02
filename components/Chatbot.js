import React, { useState, useRef, useEffect } from "react";
import { X, Send, Leaf } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I'm your garden assistant. Let me help you keep your plants and crops healthy.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "Thank you for your question! This is a demo response. Once you integrate the API, I'll provide helpful gardening advice.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 scale-90"
            : "bg-trasparent hover:scale-110"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <img
              src="/leafy.jpg"
              alt="Leafy Assistant"
              className="w-12 h-12 object-cover border-2 border-white rounded-full"
            />
            {/* REMOVED: <span className="absolute inset-0 rounded-full bg-[#1c352d] animate-ping opacity-75"></span> */}
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl transition-all duration-500 transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
        style={{
          border: "0px solid #1c352d",
        }}
      >
        {/* Header */}
        <div className="bg-[#1c352d] rounded-t-[20px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="AgroCare Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Agrocare</h3>
              <p className="text-green-200 text-xs">
                Leafy - Your personal assistent
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/leafy.jpg"
                      alt="Leafy Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  message.sender === "user"
                    ? "bg-white text-gray-800 rounded-br-sm shadow-md"
                    : "bg-[#1c352d] text-white rounded-tl-sm shadow-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>

              {message.sender === "user" && (
                <div className="flex-shrink-0 ml-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-[20px] border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write your question..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#1c352d] transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`p-3 rounded-full transition-all duration-300 ${
                inputValue.trim()
                  ? "bg-[#1c352d] hover:bg-[#2a4a3f] text-white hover:scale-110"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ChatBot;