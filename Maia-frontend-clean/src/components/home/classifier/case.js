import React, { useState} from "react";
import PropTypes from 'prop-types';
import { AiOutlineBarChart } from 'react-icons/ai';
import { TailSpin } from "react-loader-spinner";

function Case({
  fetchedData,
  handleClick,
  loading,
  requestData,
  setRequestData
}) {
  const [text, setText] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    setRequestData({
        ...requestData,
        case_information: event.target.value,
      });
  };

  const handleClickWithValidation = () => {
    if (requestData.case_information.trim() === "") {
      setHasError(true);
    } else {
      setHasError(false);
      handleClick();
    }
  };

  return (
    <div className={`flex flex-col pt-5 pb-4 ${fetchedData ? 'col-span-1 border-r border-gray-200 ' : 'col-span-2 '}`} style={{ height: 'calc(100vh - 121px)' }}>
    
      <div className="px-8 border-b border-gray-200 pb-2 mb-4 flex flex-row justify-between">
        <div className="font-semibold">Text Content</div>
      </div>

      <div className="px-8 h-full">
        <textarea
          className={`border rounded w-full focus:outline-0 p-2 text-xs h-[93%] ${hasError ? 'border-red-500 border-1.5' : 'border-gray-400'}`}
          onChange={handleTextChange}
          value={text}
          placeholder="Enter text content here"
        />
      </div>

      {!fetchedData && (
        <div className="flex justify-center pb-5">
          <button
            className="bg-accent px-2 py-1 text-white rounded text-xs h-[30px] w-[120px] flex justify-center items-center"
            disabled={loading}
            onClick={handleClickWithValidation}
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <div className="flex flex-row gap-2 text-xs">
                <AiOutlineBarChart size={20} />
                <span className="flex self-center">Analyse Case</span>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default Case;

Case.propTypes = {
    fetchedData: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    requestData: PropTypes.shape({
      case_information: PropTypes.string,
      response_format: PropTypes.string,
      response_template: PropTypes.string,
      past_responses: PropTypes.string,
      extra_information: PropTypes.string,
    }).isRequired,
    setRequestData: PropTypes.func.isRequired,
  };