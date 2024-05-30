import { useTabs } from "./TabsContext";
import "./Tabs.css";

interface TabProps {
  tabLabel: string;
  index: number;
}

const Tab: React.FC<TabProps> = ({ tabLabel, index }) => {
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
    </div>
    
  );
};
export default Tab;
