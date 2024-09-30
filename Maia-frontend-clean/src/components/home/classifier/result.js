import React from "react";
import PropTypes from 'prop-types';
import RichTextEditor from "@/components/home/classifier/text-editor";
import { BsArrowRightShort } from "react-icons/bs";

function Result ({
  data,
  setData,
  fetchedData,
}) {
  const headers = [
    "Case Title",
    "Case Type",
    "Case Description",
    "Priority",
    "Category",
    "Sub Category",
    "Sub Subcategory",
    "Sentiment",
    "Resolution Notes"
  ];

  const convertToJsonName = (str) => str.replace(" ", "_").toLowerCase();

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p className="font-semibold mb-4">Result</p>
        <button
          className="text-xs text-white bg-accent h-[30px] py-1 px-3 rounded flex flex-row gap-1"
          onClick={handleClick}
        >
          <span className="self-center">Classify New Case</span>
          <BsArrowRightShort size={20} className="self-center" />
        </button>
      </div>
      {fetchedData &&
        <div className="flex flex-col gap-2 text-xs">
          {headers.map((header, index) => (
            <div key={index} className="flex flex-row gap-4">
              <div>
                <div className="flex-none py-2 px-2 bg-blue-50 rounded w-[140px] h-[36px] text-center font-semibold">
                {header}
                </div>
              </div>
              <div>
                <div className="flex-grow h-full p-2">
                {data[convertToJsonName(header)]}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-row text-xs gap-4">
            <div className="flex-none py-2 px-2 bg-blue-50 rounded w-[140px] h-[36px] text-center font-semibold">
              Suggested Reply
            </div>
            <RichTextEditor data={data} setData={setData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Result;

Result.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  fetchedData: PropTypes.bool,
};