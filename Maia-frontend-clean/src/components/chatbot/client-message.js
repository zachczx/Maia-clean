import React from "react";
import PropTypes from 'prop-types';

function ClientMessage({
    content,
}) {
    return (
      <div className="flex justify-end ">
        <div className="bg-accent h-fit w-fit max-w-[75%] rounded-t-lg rounded-bl-lg p-2 text-xs text-white break-words">
          { content }
        </div>
      </div>
    )
}

ClientMessage.propTypes = {
    content: PropTypes.string.isRequired,
};

export default ClientMessage;
