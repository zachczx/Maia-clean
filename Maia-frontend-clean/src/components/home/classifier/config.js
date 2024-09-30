import React from "react";
import PropTypes from 'prop-types';
import OutputFormat from "@/components/home/classifier/output-format";
import PastResponse from "@/components/home/classifier/past-responses";
import ExtraInformation from "@/components/home/classifier/extra-information";
import { AiOutlineBarChart } from 'react-icons/ai';
import { TailSpin } from "react-loader-spinner";

function Config({
  requestData,
  setRequestData,
  channel,
  loading,
  handleClick,
}) {
  const handleClickWithValidation = () => {
    if (requestData.case_information.trim() !== "") {
      handleClick();
    }
  };

  return (
    <div className="border-r border-gray-200 col-span-1 px-8 pb-4 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      <div className="flex flex-row justify-between pt-6 ">
        <p className="font-semibold mb-1  self-center">Configuration <span className="text-xs font-normal italic text-gray-400">*optional</span></p>
        {(channel === "Call" && requestData.case_information !=="")&& (
          <div className="flex justify-center self-center">
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
      <OutputFormat requestData={requestData} setRequestData={setRequestData} />
      <PastResponse requestData={requestData} setRequestData={setRequestData} />
      <ExtraInformation requestData={requestData} setRequestData={setRequestData} />
    </div>
  )
}

export default Config;

Config.propTypes = {
    requestData: PropTypes.shape({
      case_information: PropTypes.string,
      response_format: PropTypes.string,
      response_template: PropTypes.string,
      past_responses: PropTypes.string,
      extra_information: PropTypes.string,
    }).isRequired,
    setRequestData: PropTypes.func.isRequired,
    channel: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
  };
