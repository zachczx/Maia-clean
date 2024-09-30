import React from 'react';
import PropTypes from 'prop-types';

function Tab ({
    selectedTab,
    setSelectedTab,
}) {
  const tabs = ["Call", "Email / Web Chat"];

  const handleSelectTab = (clickedTab) => {
    setSelectedTab(clickedTab);
  }

  return (
    <div className="w-full px-5 pt-7">
      <div className="border-b-2 border-gray-200 flex flex-row gap-x-3 text-sm">
        {tabs.map((tab, index) => (
          <button
            key={index} 
            onClick={() => handleSelectTab(tab)}
            className={`py-2 px-3 
              ${selectedTab === tab
                  ? "rounded-t-lg bg-accent text-white" 
                  : ""
              }
            `}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

Tab.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

export default Tab;
