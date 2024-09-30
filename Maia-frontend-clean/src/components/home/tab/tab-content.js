import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import TextTab from "@/components/home/text/text-tab";
import CallTab from "@/components/home/call/call-tab";
import { useAuth } from "../../../auth/auth-context";

function TabContent({
  channel,
}) {

  const { fetchWithAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    case_information: "",
    response_format: "",
    response_template: "",
    past_responses: "",
    extra_information: "",
  });
  const [fetchedData, setFetchedData] = useState(false);
  const [data, setData] = useState({
    "case_title": "",
    "case_type": "",
    "case_description": "",
    "priority": "",
    "category": "",
    "sub_category": "",
    "sub_subcategory": "",
    "sentiment": "",
    "suggested_reply": "",
    "log": []
  });

  const fetchTextData = useCallback(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const url = `http://${apiUrl}/api/query/text/`;

    const filteredData = Object.fromEntries(
      Object.entries(requestData).filter(([, value]) => value !== null && value !== "")
    );
    

    const json = filteredData;

    return fetchWithAuth(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setData(data);
        setLoading(false);
        setTimeout(() => {
          setFetchedData(true);
      }, 1000);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      return "An error has occurred";
    });
  }, [requestData, setData, setFetchedData, fetchWithAuth]);
  
  return (
    <div className="w-full grid overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      {channel === "Call" ? (
        <CallTab 
          fetchedData={fetchedData}
          requestData={requestData}
          setRequestData={setRequestData}
          fetchTextData={fetchTextData}
          data={data}
          setData={setData}
          loading={loading}
          channel={channel}
        />
      ) : (
        <TextTab 
          fetchedData={fetchedData}
          requestData={requestData}
          setRequestData={setRequestData}
          fetchTextData={fetchTextData}
          data={data}
          setData={setData}
          loading={loading}
          channel={channel}
        />
      )}
    </div>
  )
}

TabContent.propTypes = {
  channel: PropTypes.string.isRequired,
};


export default TabContent;