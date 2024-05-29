import "./Tabs.css";
import React from "react";
import { useState } from "react";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  {/*Use state för vilket nummer som är aktivt, 1,2 och 3 i detta fallet. */}
  const toggleTab = (index:number) => {
    setToggleState(index);
  };
  return (
   
    <div className="glass-container ">
      {/*Dessa är själva "tabsen" */}
      <div className="flex gap-1 text-darkPurple ">
        
          <div
            className={toggleState === 1 ? " rounded-t-lg drop-shadow-md tabs active-tabs " : "tabs rounded-t-lg  "}
            onClick={() => toggleTab(1)}
          >
            Mina events 
          </div>
        
        <div
          className={toggleState === 2 ? " rounded-t-lg  drop-shadow-md  active-tabs  tabs  " : "  rounded-t-lg  tabs"}
          onClick={() => toggleTab(2)}
        >
          Alla Events
        </div>
        <div
          className={toggleState === 3 ? "  rounded-t-lg  drop-shadow-md tabs active-tabs    " : "tabs rounded-t-lg   "}
          onClick={() => toggleTab(3)}
        >
          tab 3 
        </div>
      </div>
      {/*Här är själva innehållet i varje tab, toggleState === 1 ? "ifall toggleState stämmer överens med i detta fallet 1 så visas active-content ": " om inte så visas content"  */}
      <div className="p-2  ">
        <div
          className={
            toggleState === 1
              ? "content active-content "
              : "content"
          }
        >

          <p className=" p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            sagittis sit amet turpis nec fringilla. Sed tincidunt arcu dui, et
            fringilla ipsum gravida id. Ut a est convallis, imperdiet odio vel,
            eleifend odio. Praesent non diam eu elit imperdiet ultrices id eget
            massa. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Maecenas sollicitudin nisl odio. Proin pharetra egestas maximus.
            Nunc tempus dictum ex et tempus.
          </p>
        </div>
        <div
          className={
            toggleState === 2
              ? "content active-content  "
              : "content"
          }
        >
          <p className=" p-2">
            Mauris auctor ante eu ipsum posuere, id tempus massa aliquam. Fusce
            vel orci a arcu laoreet accumsan quis non purus. Suspendisse eu
            scelerisque augue. Cras ac feugiat ligula. Nunc erat velit, vehicula
            vel laoreet eu, dictum ut nibh. Quisque et interdum massa. Integer
            ornare, metus vel aliquet ultrices, nisi lorem fermentum libero, nec
            cursus orci odio non dui. In egestas sem eu purus scelerisque,
            placerat rhoncus urna imperdiet.
          </p>
        </div>
        <div
          className={
            toggleState === 3
              ? "content active-content   "
              : "content"
          }
        >
          <p className=" p-2">
            Mauris nisl orci, laoreet quis pretium vel, eleifend ut turpis.
            Integer suscipit nunc et convallis placerat. Sed feugiat pulvinar
            odio fringilla luctus. Proin auctor nunc quis ornare scelerisque.
            Phasellus eleifend, ante eget maximus venenatis, libero diam semper
            lectus, vitae dapibus nisi tortor at arcu. Curabitur ac tincidunt
            odio. Maecenas purus est, ultricies id purus sit amet, blandit
            dictum ante. Phasellus tincidunt eleifend nisi eget condimentum.
          </p>
        </div>
      </div>
    </div>
    
  );
}
export default Tabs;
