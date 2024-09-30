import React, { useEffect,useRef } from "react";
import PropTypes from 'prop-types';
import AgentMessage from "@/components/chatbot/agent-message";
import ClientMessage from "@/components/chatbot/client-message";

function MessageHistory ({
    messages,
    timestamp,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the bottom of the container
      const { current } = containerRef;
      current.scrollTop = current.scrollHeight;
    }
  }, [messages])
  return (
    <div className="h-[80%] p-3 overflow-y-auto" ref={containerRef}>
      <div className="text-xs flex justify-center pb-2">{ timestamp }</div>
      <div className="flex flex-col gap-y-2">
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.role === "agent" 
              ? <AgentMessage content={message.content} />
              : <ClientMessage content={message.content} />
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

MessageHistory.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.oneOf(['agent', 'client']).isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  timestamp: PropTypes.string,
};

export default MessageHistory;