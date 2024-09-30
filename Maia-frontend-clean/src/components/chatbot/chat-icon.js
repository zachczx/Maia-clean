import React from "react";
import PropTypes from 'prop-types';
import { TbMessageCircleQuestion } from "react-icons/tb";

function ChatIcon({
  setChatWindowOpen,
}) {
  const handleClick = () => {
    setChatWindowOpen(true);
  };

  return (
    <div className="w-12 h-12 rounded-full border flex justify-self-end self-end justify-center items-center m-5 bg-accent" onClick={handleClick}>
      <TbMessageCircleQuestion size={22} color="white"/>
    </div>
  );
}

ChatIcon.propTypes = {
  setChatWindowOpen: PropTypes.func.isRequired,
};

export default ChatIcon;
  