import { useTabs } from "./TabsContext";
import "./Tabs.css";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface TabProps {
  children: ReactNode;
  tabLabel: string;
  index: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
}

const Tab: React.FC<TabProps> = ({ children, tabLabel, index }) => {
  const { activeTab,setActiveTab } = useTabs();
  const handleTabClick = () => {
    setActiveTab(index); 
    console.log("ACTIVEE TTAAABABBB ", index)
  };
  return (
    
    <div
      className={
        `tabs flex-1 drop bg-textColor ${activeTab === index
          ? " rounded-t-lg drop-shadow-md tabs active "
          : "rounded-t-lg  " }`
      }
      onClick={handleTabClick}
    >
      {tabLabel}
      {children}
    </div>
    
  );
};
export default Tab;
