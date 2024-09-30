import React from "react";
import Feedback from "@/components/home/classifier/feedback";
import Result from "@/components/home/classifier/result";
import PropTypes from 'prop-types';

function Analysis({
  fetchedData,
  data,
  setData,
}) {

  return (
    <div className={`p-5 overflow-y-auto ${fetchedData ? "col-span-2" : "col-span-1"}`} style={{ height: 'calc(100vh - 121px)' }}>
      <Result
        data={data} 
        setData={setData}
        fetchedData={fetchedData}
      />
      {fetchedData && 
        <Feedback 
          data={data} 
          setData={setData} 
        />
      }
    </div>
  )
}

export default Analysis;

Analysis.propTypes = {
  fetchedData: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};