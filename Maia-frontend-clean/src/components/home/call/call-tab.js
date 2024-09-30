import React from "react";
import Transcript from "@/components/home/call/transcript"
import Analysis from "@/components/home/classifier/analysis";
import Config from "@/components/home/classifier/config";
import PropTypes from 'prop-types';

function CallTab ({
  fetchedData,
  requestData,
  setRequestData,
  fetchTextData,
  data,
  setData,
  loading,
  channel,
}) {
  return (
    <div className="grid grid-cols-3">
      <Transcript 
        fetchedData={fetchedData}
        setRequestData={setRequestData}
        requestData={requestData} 
      />
      {!fetchedData && (
        <Config 
          requestData={requestData} 
          setRequestData={setRequestData}
          channel={channel}
          loading={loading}
          handleClick={fetchTextData}
        />
      )}
      {fetchedData && (
        <Analysis 
          fetchedData={fetchedData}
          data={data}
          setData={setData}
        />
      )}
    </div>
  )
}

CallTab.propTypes = {
    fetchedData: PropTypes.bool.isRequired,
    requestData: PropTypes.shape({
      case_information: PropTypes.string,
      response_format: PropTypes.string,
      response_template: PropTypes.string,
      past_responses: PropTypes.string,
      extra_information: PropTypes.string,
    }).isRequired,
    setRequestData: PropTypes.func.isRequired,
    fetchTextData: PropTypes.func.isRequired,
    data: PropTypes.shape({
      case_title: PropTypes.string,
      case_type: PropTypes.string,
      case_description: PropTypes.string,
      priority: PropTypes.string,
      category: PropTypes.string,
      sub_category: PropTypes.string,
      sub_subcategory: PropTypes.string,
      sentiment: PropTypes.string,
      suggested_reply: PropTypes.string,
      log: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    setData: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    channel: PropTypes.string.isRequired,
  };
  

export default CallTab;