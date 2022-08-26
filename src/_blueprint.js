import {bldButton, bldText} from './_buildingKits.js';
import {getURLparam} from './_webFuncions.js';

    export function landingPage() {
        const tldname = getURLparam(document.URL, 'tld');       //  expected something like https://reactcore.on.fleek.co?tld=yscomm&xx=yy
        const jsx = (
            <div>
                {bldText('lbl001', '15%', '30%', '20%', '35%', tldname, '72pt', 'navy', '', 'centre', '', '5pt')}
                {bldText('lbl002', '5%', '70%', '50%', '15%', 'This handshake top level domain is owned by me and managed through namebase.', '18pt', 'black', '', 'centre', '', '5pt')}
                {bldButton('bttn001', '5%', '10%', '70%', '45%', 'namebase', 'bldEval("goURL", "https://namebase.io/domains/' + tldname + '")', 12, 'lightgray', 'navy', 20, 15)}
            </div>
            )
        return jsx;
    }

