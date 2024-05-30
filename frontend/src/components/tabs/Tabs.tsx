import "./Tabs.css";

import { useTabs } from "./TabsContext";
import * as React from "react";


interface TabsProps {
  children: React.ReactNode; 

}

const Tabs: React.FC<TabsProps> = ({children}) => {
  
 const {activeTab} = useTabs();

 



  return (

    
   
    <div className="glass-container mx-5">
      <div
        className="flex"
      >
        {React.Children.map(children, (child,index)=> {
          if (React.isValidElement<{label: string}>(child)) {
            return React.cloneElement(child, { index });
          }
          return null;
        })} 
      </div>
      <div
          className=" h-10"
        >
 {React.Children.map(children, (child,index)=> {
          if (React.isValidElement<{label: string}>(child)) {
            return <div key={index} className={`tabs-content ${activeTab === index ? 'active' : ''}`}>
          {child.props.children}
</div>
          }
          return null;
        })}
          
        </div>
      </div> 
    
  );
}
export default Tabs;


