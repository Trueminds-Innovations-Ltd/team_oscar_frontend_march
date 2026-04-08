import { useState, useRef, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { sendOutline, chevronDownOutline, closeOutline } from "ionicons/icons";
import api from "../api";

const ROBOT_ICON = (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const USER_ICON = (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AI_AVATAR = (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(227,64%,36%)] to-[hsl(250,100%,70%)] flex items-center justify-center flex-shrink-0">
    {ROBOT_ICON}
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-2 animate-fadeIn">
    {AI_AVATAR}
    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
      </div>
    </div>
  </div>
);

function ChatWindow({ onClose, onMinimize, onNewMessage }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "ai",
      content: "Hello! I'm your AI learning assistant. I can help you with your courses, answer questions, and connect you with tutors when needed. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [pendingTutorSelection, setPendingTutorSelection] = useState(false);
  const [lastTutorMatchMessage, setLastTutorMatchMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (!isNearBottom) {
        return;
      }
      scrollToBottom();
    }
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    if (pendingTutorSelection) {
      const tutorNumber = parseInt(input.trim());
      if (isNaN(tutorNumber) || tutorNumber < 1) {
        setError("Please enter a valid number");
        return;
      }

      setError("");
      setIsTyping(true);
      const currentInput = input;
      setInput("");

      try {
        const token = localStorage.getItem('token');
        const response = await api.post('/ai/select-tutor', {
          tutorIndex: tutorNumber,
          originalMessage: lastTutorMatchMessage
        }, token);

        const successMessage = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: response.data?.message || "I've connected you to the tutor!",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, {
          id: `user-${Date.now()}`,
          role: "user",
          content: currentInput,
          timestamp: new Date()
        }, successMessage]);
        
        setPendingTutorSelection(false);
        setLastTutorMatchMessage(null);
        onNewMessage?.();
      } catch (err) {
        const errorMsg = {
          id: `error-${Date.now()}`,
          role: "ai",
          content: err.response?.data?.message || "Sorry, I couldn't connect to that tutor. Please try again.",
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, {
          id: `user-${Date.now()}`,
          role: "user",
          content: currentInput,
          timestamp: new Date()
        }, errorMsg]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setError("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/ai/query', {
        message: userMessage.content
      }, token);

      const needsSelection = response.data?.response?.needsTutorSelection;
      
      if (needsSelection) {
        setPendingTutorSelection(true);
        setLastTutorMatchMessage(userMessage.content);
      }

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: response.data?.response?.reply || "I received your message. How can I help you further?",
        suggestions: response.data?.response?.suggestions || [],
        tutorMatch: response.data?.response?.tutorMatch || null,
        needsTutorSelection: needsSelection,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      onNewMessage?.();
    } catch (err) {
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: "ai",
        content: err.message || "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-20 left-4 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp md:bottom-4 md:left-4">
      <div className="bg-gradient-to-r from-[hsl(227,64%,36%)] to-[hsl(250,100%,60%)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            {ROBOT_ICON}
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
            <p className="text-white/70 text-xs">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Minimize chat"
          >
            <IonIcon icon={chevronDownOutline} className="text-lg" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <IonIcon icon={closeOutline} className="text-lg" />
          </button>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="h-[350px] overflow-y-auto p-4 space-y-4 bg-gray-50/50"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 animate-fadeIn ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {msg.role === "ai" && AI_AVATAR}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                {USER_ICON}
              </div>
            )}
            <div
              className={`max-w-[75%] ${
                msg.role === "user"
                  ? "bg-[hsl(227,64%,36%)] text-white rounded-2xl rounded-tr-md"
                  : msg.isError
                  ? "bg-red-100 text-red-700 rounded-2xl rounded-tl-md"
                  : "bg-white text-gray-800 rounded-2xl rounded-tl-md shadow-sm"
              }`}
            >
              <p className="px-3 py-2 text-sm leading-relaxed">{msg.content}</p>
              
              {msg.needsTutorSelection && (
                <div className="px-3 pb-2">
                  <p className="text-xs font-semibold text-blue-600">Enter the number of the tutor you want to connect with:</p>
                </div>
              )}
              
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="px-3 pb-2 flex flex-wrap gap-1">
                  {msg.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(suggestion)}
                      className="text-xs px-2 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {msg.tutorMatch && msg.tutorMatch.tutors && msg.tutorMatch.tutors.length > 0 && (
                <div className="px-3 pb-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-1">
                    <p className="text-xs font-semibold text-green-700 mb-1">Available Tutors:</p>
                    {msg.tutorMatch.tutors.map((tutor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-green-600">
                        <span className="font-medium">{idx + 1}. {tutor.name}</span>
                        <span className="text-green-400">•</span>
                        <span className="text-green-500">{tutor.program}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className={`text-[10px] px-3 pb-1 ${
                msg.role === "user" ? "text-white/60" : "text-gray-400"
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder={pendingTutorSelection ? "Enter tutor number..." : "Ask me anything..."}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-2 rounded-lg transition-all ${
              input.trim() && !isTyping
                ? "bg-[hsl(227,64%,36%)] text-white hover:bg-[hsl(227,64%,30%)]"
                : "bg-gray-200 text-gray-400"
            }`}
            aria-label="Send message"
          >
            <IonIcon icon={sendOutline} className="text-lg" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          Press Enter to send • Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}

export default ChatWindow;
