import React from "react";
import PropTypes from 'prop-types';
import Header from "@/components/chatbot/header";
import Body from "@/components/chatbot/body";

function ChatWindow({
    setChatWindowOpen,
}) {
  return (
    <div className="justify-self-end self-end flex m-5 bg-accent w-72 h-80 rounded-lg p-1 flex-col">
      <Header setChatWindowOpen={setChatWindowOpen}/>
      <Body />
    </div>
  );
}

ChatWindow.propTypes = {
  setChatWindowOpen: PropTypes.func.isRequired,
};

export default ChatWindow;
