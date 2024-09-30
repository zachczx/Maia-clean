import React from 'react';
import PropTypes from 'prop-types';
import { MdAddCircle } from "react-icons/md";

function History ({
    callHistory,
    selectedCall,
    setSelectedCall,
}) {

  const convertTimestamp = (timestamp) => {
    const [date, time] = timestamp.split("T");
    const shortenedTime = time.slice(0,5);
    return date + " " + shortenedTime
  }
  return (
    <div className="flex flex-col border-r border-gray-200 text-sm">
      {callHistory.map((call, index) => (
        <div className={`py-4 px-8 ${selectedCall.id === call.id ? 'bg-blue-50 border-l-2 border-accent' : 'border-b'}`} key={index} onClick={() => setSelectedCall(call)}>
        <p>{call.caller_info.name}</p>
        <p className="text-gray-700 text-xs italic pt-1">{convertTimestamp(call.conversation.timestamp)}</p>
      </div>
      ))}
      <div className="absolute my-3 mx-6 bottom-0">
        <button className="flex flex-row gap-2 bg-accent text-white text-xs w-fit rounded-lg px-2 py-1.5">
          <MdAddCircle size={20}/>
          Add New Call
        </button>
      </div>
    </div>
  )
}

History.propTypes = {
  callHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      caller_info: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      conversation: PropTypes.shape({
        timestamp: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedCall: PropTypes.shape({
    id: PropTypes.number.isRequired,
    caller_info: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    conversation: PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setSelectedCall: PropTypes.func.isRequired,
};

export default History;