import React, { useState } from "react";
import PropTypes from 'prop-types';

function OutputFormat ({
  requestData,
  setRequestData,
}) {
  const formats = ["Call Notes", "Email",];
  const suggestedFormats = {
    "Call Notes": "Here are the key points to communicate to the customer:\n\n - [point 1]\n - [point 2]\n - [point 3]",
    "Email": "Dear [Recipient's Name],\n\nThank you for contacting NS Contact Center. We have investigated your query and [resolution].\n\nPlease contact us again if you have any further queries.\n\nBest regards,\n[Your Name]\nYour Company\n[Contact Information]",
  }
  const [selectedFormat, setSelectedFormat] = useState("");
  const [template, setTemplate] = useState("");

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    setTemplate(suggestedFormats[format]);
    setRequestData({
        ...requestData,
        response_format: format,
      });
  }

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
    setRequestData({
        ...requestData,
        response_template: event.target.value,
      });
  };

  return (
    <div className="flex flex-col mt-5">
      <div>
        <div className="flex flex-col gap-3 mb-4">
          <p className="text-xs">Preferred format:</p> 
          <div className="flex flex-row gap-3">
            {formats.map((format, index) => (
              <div 
                key={index}
                className={`border border-1 border-gray-500 rounded px-2 py-1.5 h-[28px] text-xs cursor-pointer ${format === selectedFormat ? "border-1 bg-blue-50" : ""}`}
                onClick={()=> handleFormatChange(format)}
              >
                {format}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs">Preferred response template:</p>
          <textarea
            className="border border-1 border-gray-400 rounded w-full focus:outline-0 p-2 text-xs h-[80px] whitespace-pre-wrap"
            onChange={handleTemplateChange}
            value={template}
          />
        </div>
      </div>
    </div>
  )
}

export default OutputFormat;

OutputFormat.propTypes = {
  requestData: PropTypes.shape({
    case_information: PropTypes.string,
    response_format: PropTypes.string,
    response_template: PropTypes.string,
    past_responses: PropTypes.string,
    extra_information: PropTypes.string,
  }).isRequired,
  setRequestData: PropTypes.func.isRequired,
};