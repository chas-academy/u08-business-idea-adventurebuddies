import { createContext, useCallback, useContext, useState } from "react";


interface TabContextValue {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const TabsContext = createContext<TabContextValue | undefined>(undefined);
console.log(TabsContext);

export const useTabs = (): TabContextValue =>{
    const context = useContext (TabsContext);
    if (context === undefined) {
        throw new Error("useTabs, must be used inside of tabs provider")
    }
    const setActiveTab = useCallback(
        (index: number) => {
          context.setActiveTab(index);
        },
        [context.setActiveTab]
      );
    
      return { ...context, setActiveTab };
}

interface TabsProviderProps {
    children: React.ReactNode
    
  }

export const TabsProvider: React.FC<TabsProviderProps> = ({children}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <TabsContext.Provider value={{activeTab, setActiveTab}}>
            {children}

        </TabsContext.Provider>
    )
}