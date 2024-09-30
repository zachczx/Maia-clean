import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineLightBulb } from "react-icons/hi";

function Suggestion({
  content
}) {
  return (
    <div className="my-4 p-3 bg-blue-50 text-sm flex flex-col gap-2 rounded-lg">
      <div className="flex flex-row gap-1 text-xs font-semibold">
        <HiOutlineLightBulb size={18} />
        <span className="flex items-center">Suggested reply:</span>
      </div>
      {content}
    </div>
  )
}

Suggestion.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Suggestion;