import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isStreaming?: boolean;
}

interface StreamingMessageProps {
  content: string;
  isStreaming: boolean;
  speed?: number; // characters per second
}

const StreamingMessage: React.FC<StreamingMessageProps> = ({
  content,
  isStreaming,
  speed = 50
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [buffer, setBuffer] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update buffer when new content arrives
    setBuffer(content);
  }, [content]);

  useEffect(() => {
    if (isStreaming && buffer.length > displayedContent.length) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Start character-by-character display
      intervalRef.current = setInterval(() => {
        setDisplayedContent((prev) => {
          const nextIndex = prev.length;
          if (nextIndex < buffer.length) {
            return buffer.slice(0, nextIndex + 1);
          } else {
            // Reached the end of current buffer
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return prev;
          }
        });
      }, 1000 / speed);
    } else if (!isStreaming) {
      // If streaming is complete, show all content immediately
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayedContent(content);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [buffer, isStreaming, speed, displayedContent.length, content]);

  return (
    <div className="message ai-message">
      <div className="message-content">
        {displayedContent}
        {isStreaming && <span className="cursor">|</span>}
      </div>
    </div>
  );
};

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API streaming
  const simulateStreamingResponse = async (userMessage: string) => {
    const aiMessageId = Date.now().toString();

    // Add initial AI message
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        content: "",
        isUser: false,
        isStreaming: true
      }
    ]);

    // Simulate streaming chunks (replace with your actual API call)
    const mockResponse = `This is a simulated AI response to: "${userMessage}". I'm demonstrating how text can stream in smoothly character by character instead of in chunks. This creates a much better user experience!`;

    const chunks = mockResponse.match(/.{1,5}/g) || []; // Split into chunks of 5 characters

    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, 100 + Math.random() * 200)
      ); // Simulate network delay

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: chunks.slice(0, i + 1).join("") }
            : msg
        )
      );
    }

    // Mark as complete
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
      )
    );
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: userMessage,
        isUser: true
      }
    ]);

    await simulateStreamingResponse(userMessage);
    setIsLoading(false);
  };

  return (
    <div className="chat-app">
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? "user-message" : "ai-message"}`}
          >
            {message.isUser ? (
              <div className="message-content">{message.content}</div>
            ) : (
              <StreamingMessage
                content={message.content}
                isStreaming={message.isStreaming || false}
                speed={50} // Adjust speed as needed
              />
            )}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && void handleSendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          onClick={void handleSendMessage}
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
