import React, { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../auth/auth-context";

function InputBar ({
  messages,
  setMessages,
}) {
  // const apiUrl = process.env.REACT_APP_API_URL;

  const {fetchWithAuth} = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleQuerySubmit();
    }
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchData = () => {
      const url = `http://${apiUrl}/api/chat/`;
      const data = {
        chat_history: messages
      };
      return fetchWithAuth(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
          if (data.response) {
              return data.response;
          }
      })
      .catch((error) => {
          console.log(error)
          return "An error has occurred";
      });
    }

    const getChatResponse = async () => {
      const response = await fetchData()

      const message = {content: response, role: "agent"}
      setMessages(prevMessages => [
        ...prevMessages,
        message
      ]);

      setIsFetchingData(false);
    }

    if (messages.length%2 === 0 && messages.length !== 0){
      getChatResponse()
    }
  }, [messages, fetchWithAuth, setMessages])
  

  const handleQuerySubmit = () => {
    const clientInput = {content: inputValue, role: "client"}
    setIsFetchingData(true);
    setMessages(prevMessages => [
      ...prevMessages,
      clientInput
    ]); 
    setInputValue("");
  };

  return (
    <div className="border-t border-grey-500 h-[20%] flex flex-row justify-between">
      <input 
        type="text" 
        className="border-0 focus:outline-0 py-2 px-3 text-xs items-center w-full rounded-lg bg-white" 
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your question here"
        value={inputValue}
        disabled={isFetchingData}
      />
      <button className="self-center px-2" onClick={handleQuerySubmit}>
        <IoMdSend size={20}/>
      </button>
    </div>
  )
}

InputBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['client', 'agent']).isRequired,
  })).isRequired,
  setMessages: PropTypes.func.isRequired,
};

export default InputBar;