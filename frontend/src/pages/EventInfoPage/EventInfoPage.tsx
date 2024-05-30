import Tab from "../../components/tabs/Tab";
import Tabs from "../../components/tabs/Tabs";
import { TabsProvider } from "../../components/tabs/TabsContext";

const EventInfoPage = () => {

    return (
        <TabsProvider >
        <Tabs>
       
        <Tab tabLabel="Mina Events"><div>hej event1</div></Tab>
        <Tab tabLabel="Alla Events"><div>hej event 2</div></Tab>
        
        <Tab tabLabel="Test Test Test"><div>hej event 3</div></Tab>
        Event info
        </Tabs>
        
        </TabsProvider>
    )
}

export default EventInfoPage;