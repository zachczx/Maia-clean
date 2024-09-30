import React, { useState } from "react";
import ChatWindow from "@/components/chatbot/chat-window";
import ChatIcon from "@/components/chatbot/chat-icon";

function Chatbot() {
    const [chatWindowOpen, setChatWindowOpen] = useState(false);

    return (
      <div className="fixed bottom-0.5 right-5 z-50">
        {chatWindowOpen ? (
          <ChatWindow setChatWindowOpen={setChatWindowOpen} />
        ) : (
          <ChatIcon setChatWindowOpen={setChatWindowOpen} />
        )}
      </div>
    );
  }
  
  export default Chatbot;
  