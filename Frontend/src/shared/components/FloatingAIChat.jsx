import { useState, useRef, useEffect, useCallback } from "react";
import ChatWindow from "./ChatWindow";

function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const isMobileView = window.innerWidth < 768;
      if (isMobileView) {
        setPosition({ x: 20, y: window.innerHeight - 90 });
      } else {
        setPosition({ x: 20, y: window.innerHeight - 90 });
      }
    };
    
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const newX = Math.max(0, Math.min(window.innerWidth - 70, clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 70, clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleMouseMove);
        document.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y
    });
    setIsDragging(true);
  }, [position]);

  const handleMouseDown = (e) => {
    handleDragStart(e);
  };

  const handleTouchStart = (e) => {
    const timer = setTimeout(() => {
      handleDragStart(e);
    }, 300);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const toggleChat = () => {
    if (!isDragging) {
      setIsOpen(!isOpen);
      setIsMinimized(false);
      if (!isOpen) {
        setHasNewMessage(false);
      }
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const handleNewMessage = () => {
    if (!isOpen || isMinimized) {
      setHasNewMessage(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-[9999] select-none"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {isOpen && !isMinimized && (
        <ChatWindow
          onClose={() => setIsOpen(false)}
          onMinimize={handleMinimize}
          onNewMessage={handleNewMessage}
        />
      )}

      <div
        className={`
          relative flex items-center justify-center cursor-grab active:cursor-grabbing
          transition-all duration-300 ease-out
          ${isDragging ? "scale-110" : "hover:scale-110"}
        `}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={toggleChat}
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(227,64%,36%)] to-[hsl(250,100%,70%)] shadow-lg flex items-center justify-center">
            {isOpen ? (
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </span>
          )}
        </div>

        {isMinimized && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap hover:bg-gray-50 transition-colors"
          >
            Resume Chat
          </button>
        )}
      </div>
    </div>
  );
}

export default FloatingAIChat;
