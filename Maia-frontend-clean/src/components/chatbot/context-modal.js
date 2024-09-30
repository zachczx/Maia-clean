import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';

function ContextModal({
  setContextModalOpen,
  content,
}){
  const modalRef = useRef();
  const [QnA, setQnA] = useState(["",""]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setContextModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setContextModalOpen]);

  const handleCancel = () => {
    setContextModalOpen(false);
  }

  useEffect(() => {
    const formattedContent = () => {
      const firstDoubleNewlineIndex = content.indexOf('\n\n');
      if (firstDoubleNewlineIndex === -1) {
        return content;
      }

      const question = content.substring(0, firstDoubleNewlineIndex).trim();
      const answer = content.substring(firstDoubleNewlineIndex + 2).trim();
      setQnA([question, answer]);
      return;
    };
    formattedContent(content)
  }, [content])

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div ref={modalRef} className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-[40%] max-h-[80%] overflow-y-auto p-5 text-xs">
        <div className="mb-5 whitespace-pre-wrap">
          <div className="mb-5 text-sm font-semibold">
            {QnA[0]}
          </div>
          <div className="bg-blue-50 rounded p-3">
            {QnA[1]}
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            className="px-2 py-1.5 rounded-lg text-xs bg-accent text-white"
            onClick={handleCancel}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

ContextModal.propTypes = {
    setContextModalOpen: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  };

export default ContextModal;