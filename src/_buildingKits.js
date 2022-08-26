
    import {goURL} from './_webFuncions.js';

    export function bldButton(xID, xHeight, xWidth, xTop, xLeft, xText, xAction, xFontSize, xBackColor, xFontColor, xTabIndex, xRadius) {
        if (!xBackColor) { xBackColor = 'gray'; };
        if (!xFontColor) { xFontColor = 'black'; };
        if (!xRadius) { xRadius = 0; };
        if (!xAction) { xAction = ''; };

        const complex  = <button id={xID} type='text' title='undefined' onClick={() => eval(xAction)}
            style={{zindex: 1, position: 'absolute', height: xHeight, width: xWidth,
                top: xTop, left: xLeft, background: xBackColor, cursor: 'pointer', color: xFontColor, borderRadius: xRadius, borderColor: xBackColor, fontsize: {xFontSize}, 
                borderStyle: 'solid', display: '', verticalAlign: 'bottom'}}>{xText}</button>
        return complex;
    }

    export function bldText(xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xForeColor, xBackColor, xAlign, xAction, xTextOffset) {
        if (!xTextOffset) { xTextOffset = '0px'; }
        if (!xForeColor) { xForeColor = 'black'; }
        if (!xBackColor) { xBackColor = 'transparent'; }
        if (!xAlign) { xAlign = 'left'; }
        if (xAlign === 'centre') { xAlign = 'center'; }

        const complex =
            <div id={xID + 'x'} title="undefined" onClick={() => eval(xAction)}
                style={{zindex:1, position: 'absolute', height: xHeight, width: xWidth, top: xTop, left: xLeft, background: xBackColor,
                textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer', textAlign: xAlign, verticalAlign:'bottom'}}>
                <label id={xID} 
                    style={{borderStyle: 'none', position: 'relative', top: '5px', fontSize: xFontSize, color: xForeColor}}>{xText}
                </label>
            </div>
        return complex;
    }

        
export function bldEval (xFunc, xParam) {
    if (xFunc === 'goURL') { goURL(xParam) };
    return;
}



