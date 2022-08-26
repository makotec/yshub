import {bldButton, bldText} from './_buildingKits.js';

export function basePage(xName, xBackColor) {
  //  alert ('color: ' + xBackColor)
    const pageFrame = (
        <div className="App-header" >
            <header className={xName} style={{zindex:1, background: 'pink'}}>
            {/* {bldButton('bttnID', '5%', '20%', '90%', '40%', 'Click me !', 'sayHello("boy")', 12, 'yellow', 'navy', 20, 15)}
            {bldText('lblID', '5%', '100%', '5%', '0%', 'Hello there  ! ! !', '16', 'maroon', 'lightgray', 'centre', '', '5pt')} */}
            </header>
        </div>)
    return pageFrame;
}
