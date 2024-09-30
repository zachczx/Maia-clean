import React, {useEffect, useState} from "react";
import InputBar from "@/components/chatbot/input-bar";
import MessageHistory from "@/components/chatbot/message-history";

function Body () {
  const [messages, setMessages] = useState([]);
  const [timestamp, setTimestamp] = useState();

  function getTimestamp() {
    const date = new Date();

    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month}, ${hours}:${minutes}`;
  }

  useEffect(() => {
    const defaultFirstMessage = [{role: "agent", content: "Hello! How can I assist you with your current task?"}];
    setMessages(defaultFirstMessage);	
    setTimestamp(getTimestamp());
  }, [])

  return (
    <div className="bg-white rounded-lg w-full h-64">
      <MessageHistory messages={messages} timestamp={timestamp} />
      <InputBar messages={messages} setMessages={setMessages} />
    </div>
  )
}

export default Body;