import React, {useState} from "react";
import Tab from "@/components/home/tab/tab";
import TabContent from "./tab/tab-content";

function Body () {
  const [selectedTab, setSelectedTab] = useState("Call");
  return (
    <div>
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab !== "" && (<TabContent channel={selectedTab} />)}
    </div>
  )
}

export default Body;