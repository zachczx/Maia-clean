import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types';

function PastResponse ({
  requestData,
  setRequestData,
}) {
  const [text, setText] = useState("");
  const [responses, setResponses] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAddResponse = () => {
    if (text !== "") {
      setResponses([text, ...responses]);
      setText("");
    }

    setRequestData({
        ...requestData,
        past_responses: responses.join(", "),
      });
  }

  const handleRemoveResponse = (response) => {
    console.log(responses)
    if (responses.length === 1){
        setResponses([])
        setRequestData({
            ...requestData,
            past_responses: null,
          });
    }
    const updatedResponses = responses.filter(item => item !== response);
    setResponses(updatedResponses);
    setRequestData({
        ...requestData,
        past_responses: responses.join(", "),
      });
  }

  return (
    <div className="flex flex-col gap-3 mt-5">
      <p className="text-xs">Past responses:</p> 
      <div className="flex flex-col gap-3">
        <textarea
          className="border border-1 border-gray-400 rounded w-full focus:outline-0 p-2 text-xs h-[80px]"
          placeholder="Copy & paste past response here"
          onChange={handleTextChange}
          value={text}
        />
      </div>
      <div className="flex justify-end">
        <div 
          className="flex flex-row gap-1 cursor-pointer text-black h-[30px] bg-blue-50 w-fit rounded py-1 px-2"
          onClick={() => handleAddResponse()}
        >
          <IoIosAddCircleOutline size={20} className="flex self-center"/>
          <span className="text-xs flex items-center">Add Past Response</span>
        </div>
      </div>

      <div className={`flex flex-col gap-2 mt-1 ${responses.length !== 0 ? "": "hidden"}`}>
        {responses.map((response, index) => (
          <div 
            key={index} 
            className="text-xs rounded bg-blue-50 p-2 w-full flex flex-row justify-between gap-5"
          >
            <div className="whitespace-pre-wrap">
              {response}
            </div>
            <div 
              className="rounded-full bg-gray-400 p-0.5 text-white flex self-center cursor-pointer" 
              onClick={() => handleRemoveResponse(response)}
            >
              <RxCross2 
                className="flex self-center"
                size={14} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PastResponse;

PastResponse.propTypes = {
  requestData: PropTypes.shape({
    case_information: PropTypes.string,
    response_format: PropTypes.string,
    response_template: PropTypes.string,
    past_responses: PropTypes.string,
    extra_information: PropTypes.string,
  }).isRequired,
  setRequestData: PropTypes.func.isRequired,
};