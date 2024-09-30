import React, { useState } from "react";
import PropTypes from 'prop-types';

function ExtraInformation ({
  requestData,
  setRequestData,
}) {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
    setRequestData({
        ...requestData,
        extra_information: text,
      });
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-col gap-3">
        <p className="text-xs">Additional Information:</p> 
        <textarea
          className="border border-1 border-gray-400 rounded w-full focus:outline-0 p-2 text-xs h-[80px]"
          placeholder="E.g. Pre-enlistee or NSman"
          onChange={handleTextChange}
          value={text}
        />
      </div>
    </div>
  )
}

export default ExtraInformation;

ExtraInformation.propTypes = {
  requestData: PropTypes.shape({
    case_information: PropTypes.string,
    response_format: PropTypes.string,
    response_template: PropTypes.string,
    past_responses: PropTypes.string,
    extra_information: PropTypes.string,
  }).isRequired,
  setRequestData: PropTypes.func.isRequired,
};