
jsBld = {

    jsBld_info: function () { return 'jsBld|2022.0715.1545'; },

    bldAction: function (xElement, xTrigger, xAction, xIndex) {
        if (xTrigger === 'onPressHold') {
            document.getElementById(xElement).addEventListener('touchstart',jsGizmo.touchstart, false);
            document.getElementById(xElement).addEventListener('touchend', jsGizmo.touchend,false);

            document.getElementById(xElement).setAttribute('touchstart', "jsGizmo.touchstart()");
            document.getElementById(xElement).setAttribute('touchend', "jsGizmo.touchend()");
        } else {
            if (ps.testhub && xTrigger === 'onblur') { 
                xAction = 'jsGizmo.thSetValue("Textbox","' + xElement + '","' + xAction + '")';
                document.getElementById(xElement).setAttribute("onchange", "return jsGizmo.cyTrackTextboxInput('" + xID + "')"); 
            } 
            document.getElementById(xElement).setAttribute(xTrigger, "return " + xAction + ';');
        }
        if (!xIndex) { xIndex = "1";};
        document.getElementById(xElement).style.zIndex = xIndex;
        document.getElementById(xElement).style.cursor = "pointer";
        return;
    },

    bldBox: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xBackColour, xRadius, xOnCLick) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xRadius) { xRadius = 0; }
        var iDiv = document.createElement('div');
        iDiv.id = xID;
        var locStyle = "z-index: 1" +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: " + xBackColour +
            ";cursor: pointer" +
            ";border-radius: " + xRadius + "px" +
            ";display: " +
            ";verticalAlign: bottom";
        if (xOnCLick) {
            iDiv.setAttribute("onMouseDown", "return " + xOnCLick + ';');
        }
        iDiv.setAttribute("style", locStyle);
        xPanel.appendChild(iDiv);
        return;
    },
    
    bldBoxPanel: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xBackColour, xRadius, xOnCLick, zIndex) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (xPanel.style.height.slice(-2) === 'px') {
            if (('x' + xHeight).slice(-1) === "%")  { xHeight = jsGizmo.doNum(xHeight) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; } 
            if (('x' + xWidth).slice(-1) === "%")  { xWidth = jsGizmo.doNum(xWidth) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
            if (('x' + xTop).slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
            if (('x' + xLeft).slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
        }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xRadius) { xRadius = 0; }
        if (!zIndex) { zIndex = 1; }
        var iDiv = document.createElement('div');
        iDiv.id = xID;
        var locStyle = "z-index: " + zIndex +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: " + xBackColour +
            ";cursor: pointer" +
            ";border-radius: " + xRadius + "px" +
            ";display: " +
            ";verticalAlign: bottom";
        if (xOnCLick) {
            iDiv.setAttribute("onMouseDown", "return " + xOnCLick + ';');
        }
        iDiv.setAttribute("style", locStyle);
        xPanel.appendChild(iDiv);
        return;
    },
    
    bldBoxButton: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xAction, xFontSize, xBackColour, xFontColor, xTabIndex) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (xPanel.style.height.slice(-2) === 'px') {
            if (('x' + xHeight).slice(-1) === "%")  { xHeight = jsGizmo.doNum(xHeight) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
            if (('x' + xWidth).slice(-1) === "%")  { xWidth = jsGizmo.doNum(xWidth) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
            if (('x' + xTop).slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
            if (('x' + xLeft).slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
        }
        if (!xBackColour) { xBackColour = 'gray'; }
        if (!xFontColor) { xFontColor = 'black'; }
        ps.tabindex += 1;
        var newButton = document.createElement('button');
        newButton.id = xID;
        newButton.type = "text";
        newButton.innerHTML = xText;
        newButton.tabIndex = ps.tabindex;
        newButton.title = ps.Title;
        var locStyle =  "z-index: 1" +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: " + xBackColour +
            ";cursor: pointer" +
            ";color: " + xFontColor +
            ";border-radius: 10px" +
            ";border-color: " + xBackColour +
            ";border-style: solid" +
            ";font-Size: " + xFontSize + "pt" +
            ";display: " +
            ";verticalAlign: bottom";
        newButton.setAttribute("style", locStyle);        
        if (xTabIndex) { newButton.tabIndex = xTabIndex; };        
        xPanel.appendChild(newButton);
        if (ps.testhub) {
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.text', '" + xText + "')");
            document.getElementById(xID).addEventListener("click", function(){jsGizmo.cyClick(xID)}, true);
        }
        document.getElementById(xID).addEventListener("click", function(){eval(xAction)}, true);
        return;
    },
        
    bldBoxInput: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xBackColour, xHint, xMode, xFontColor, xTabIndex) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xFontSize) { xFontSize = ''; } else { xFontSize = xFontSize + 'pt'; };
        if (!xFontColor) { xFontColor = 'black'; }
        if (xBackColour === '') { xBackColor = 'transparent'; }
        if (xMode === '') { xMode = 'text'; }
        if (!xText) { xText = ''; }
        if (xMode === 'multi') { 
            var newTB = document.createElement('textarea');
            newTB.rows = 5; } else {
            var newTB = document.createElement('input');          
            }
    //    if (xMode === 'number') { xMode = 'text'; newTB.pattern = "\\d*";
//        if (xMode === 'number') { xMode = 'decimal'; }  input type="number" pattern="[0-9]*"
        if (xMode === 'number') { newTB.pattern = "[0-9]*"; }
        if (xMode === 'decimal') { newTB.pattern = "\d+(\.\d*)?"; }

        ps.tabindex += 1;
        newTB.id = xID;
        newTB.name = xID;
        newTB.type = xMode;
        newTB.title = ps.Title;
        newTB.autocomplete = "new-password";
        newTB.autofill = "off";
        newTB.value = xText;
        newTB.tabIndex = ps.tabindex;
 //       if (xTabIndex) { newTB.tabIndex = xTabIndex; };
        var locStyle = "z-index: 1" +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";color: " + xFontColor +
            ";background: " + xBackColour +
            ";cursor: pointer" +
            ";border-radius: 10px" +
            ";border-color: gray" +
            ";border-style: none" +
            ";font-Size: " + xFontSize +
            ";display: " +
            ";vertica;lAlign: bottom";
        newTB.setAttribute("style", locStyle);
        xAction = "window.scrollTo(0, 0)";
        if (xHint !== '') { 
            newTB.placeholder = xHint;
            newTB.placeholder.bold = true;
        }
        if (ps.testhub) { 
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check textbox `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
            xAction = 'jsGizmo.thSetValue("Textbox","' + xID + '","")'; 
            newTB.setAttribute("onchange", "return jsGizmo.cyTrackTextboxInput('" + xID + "')");
        }        
        newTB.setAttribute("onblur", xAction);               
        xPanel.appendChild(newTB);
        document.getElementById(xID).value = xText;
        return;
    },

    bldButton: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xAction, xFontSize, xBackColour) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newButton = document.createElement('button');
        ps.tabindex += 1;
        newButton.id = xID;
        newButton.type = "text";
        newButton.innerHTML = xText;
        newButton.tabIndex = ps.tabindex;
        newButton.title = ps.Title;
        var locStyle = "height: " + xHeight +
            ";position: absolute" +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";width: " + xWidth +
            ";font-Size: " + xFontSize + "pt" +
            ";background-color: " + xBackColour +
            ";text-align: center";
        newButton.setAttribute("style", locStyle);        
        if (ps.testhub) {
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.text', '" + xText + "')");
            newButton.addEventListener("click", function(){jsGizmo.cyClick(xID)}, true);
        }
        newButton.addEventListener("click", function(){eval(xAction)}, true);
        xPanel.appendChild(newButton);
        return;
    },

    bldCanvas: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xBackColor,zIndex) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xBackColor) { xBackColor = 'white'; }
        if (!zIndex) { zIndex = 1; }
        if (xPanel.style.height.slice(-2) === 'px') {
            if (('x' + xHeight).slice(-1) === "%")  { xHeight = jsGizmo.doNum(xHeight) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; } 
            if (('x' + xWidth).slice(-1) === "%")  { xWidth = jsGizmo.doNum(xWidth) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
            if (('x' + xTop).slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
            if (('x' + xLeft).slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
        }
        var iDiv = document.createElement('div');        
        ps.tabindex += 1;
        iDiv.id = xID + 'x';
        var locStyle = "z-index: 1" + "height: " + xHeight +
            ";position: absolute" +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";width: " + xWidth;
        iDiv.setAttribute("style", locStyle);        

        var newCanvas = document.createElement("canvas");
        ps.tabindex += 1;
        newCanvas.id = xID;
        var locStyle = ";color = maroon" +
            ";background-color: " + xBackColor +
            ";border: 1px solid";        
        newCanvas.setAttribute("style", locStyle);        
        iDiv.appendChild(newCanvas);
        xPanel.appendChild(iDiv);
        return;
    },
    
    bldComboBox: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xBackColor, xHint, xNextTab, xListSize, xItemList, xFontColor) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (xPanel.style.height.slice(-2) === 'px') {
            if (('x' + xHeight).slice(-1) === "%")  { xHeight = jsGizmo.doNum(xHeight) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; } 
            if (('x' + xWidth).slice(-1) === "%")  { xWidth = jsGizmo.doNum(xWidth) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
            if (('x' + xTop).slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
            if (('x' + xLeft).slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
        }

        var newTB = document.createElement('input');
        if (xBackColor === '') { xBackColor = 'transparent'; }
        if (!xFontColor) { xFontColor = 'black'; }
        if (!xItemList) { xItemList = ''; }
        if (!xText) { xText = ''; }
        ps.tabindex +=5;
        ps.tabList[xID + 'List'] = xNextTab;
        newTB.id = xID;
        newTB.type = 'text';
        newTB.value = xText;
        newTB.tabIndex = ps.tabindex;
        newTB.autocomplete = "off";
        newTB.title = ps.Title;
        newTB.style.height = xHeight;
        newTB.style.width = jsGizmo.doNum(xWidth) - 20 + 'px';
        newTB.style.top = xTop;
        newTB.style.left = xLeft;
        newTB.style.color = xFontColor;
        newTB.style.fontSize = xFontSize + "pt";
        newTB.style.position = "absolute";
        newTB.style.backgroundColor = xBackColor;
        newTB.style["paddingLeft"] = "5px";
        newTB.style["paddingRight"] = "5px";
        newTB.style.position = "absolute";
        newTB.style.zIndex = 60;
        newTB.setAttribute("onfocus", "jsCombo.comboTextFocus('" + xID + "List','" + xNextTab + "'," + xListSize + ")");
        newTB.setAttribute("onblur", "jsCombo.comboTextBlur('" + xID + "')");
        newTB.setAttribute("onkeyup", "jsCombo.comboFilter('" + xID + "','" + xID + "List')");
        if (xHint !== '') { newTB.placeholder = xHint; }
        newTB.placeholder.bold = true;
        xPanel.appendChild(newTB);
        jsBld.bldDropdown(xPanel, xID + 'List', jsGizmo.doNum(xHeight) + 5 + 'px', jsGizmo.doNum(xWidth) - 5 + 'px', jsGizmo.doNum(xTop) + jsGizmo.doNum(xHeight) + 3 + 'px', xLeft, '',xFontSize, xBackColor, 'left', '', 80); 
        document.getElementById(xID + 'List').setAttribute("onmousedown", "jsCombo.comboMouseOnList('" + xID + "')");
        document.getElementById(xID + 'List').setAttribute("onmouseup", "jsCombo.comboSelection('" + xID + "')");
        document.getElementById(xID + 'List').style.display = 'none';
        document.getElementById(xID + 'List').tabIndex = 9999;
        document.getElementById(xID + 'List').innerHTML = xItemList;
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check combobox `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
        };
        return;
    },

    bldComboBoxNew: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xBackColor, xHint, xNextTab, xListSize, xItemList, xFontColor) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (xPanel.style.height.slice(-2) === 'px') {
            if (('x' + xHeight).slice(-1) === "%")  { xHeight = jsGizmo.doNum(xHeight) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; } 
            if (('x' + xWidth).slice(-1) === "%")  { xWidth = jsGizmo.doNum(xWidth) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
            if (('x' + xTop).slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
            if (('x' + xLeft).slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
        }

       var iDiv = document.createElement('div');
        iDiv.id = xID + 'Div';
        var locStyle = "z-index: 20 " +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: transparent" + 
            ";display: " +
            ";verticalAlign: top";
        iDiv.setAttribute("style", locStyle);      
        iDiv.title = ps.Title;
        
        var newTB = document.createElement('input');
        if (xBackColor === '') { xBackColor = 'transparent'; }
        if (!xFontColor) { xFontColor = 'black'; }
        if (!xItemList) { xItemList = ''; }
        if (!xText) { xText = ''; }
        ps.tabindex +=5;
        ps.tabList[xID + 'List'] = xNextTab;
        newTB.id = xID;
        newTB.type = 'text';
        newTB.value = xText;
        newTB.tabIndex = ps.tabindex;
        newTB.autocomplete = "off";
//        newTB.title = ps.Title;
        newTB.style.height = xHeight;
        newTB.style.width = jsGizmo.doNum(xWidth) - 20 + 'px';
        newTB.style.top = "0px";    //xTop;
        newTB.style.left = "0px";    //xTop;
        newTB.style.color = xFontColor;
        newTB.style.fontSize = xFontSize + "pt";
        newTB.style.position = "absolute";
        newTB.style.backgroundColor = xBackColor;
        newTB.style["paddingLeft"] = "5px";
        newTB.style["paddingRight"] = "5px";
        newTB.style.position = "absolute";
        newTB.style.zIndex = 60;
        newTB.setAttribute("onfocus", "jsCombo.comboTextFocus('" + xID + "List','" + xNextTab + "'," + xListSize + ")");
        newTB.setAttribute("onblur", "jsCombo.comboTextBlur('" + xID + "')");
        newTB.setAttribute("onkeyup", "jsCombo.comboFilter('" + xID + "','" + xID + "List')");
        if (xHint !== '') { newTB.placeholder = xHint; }
        newTB.placeholder.bold = true;
        iDiv.appendChild(newTB);
        jsBld.bldDropdown(iDiv, xID + 'List', jsGizmo.doNum(xHeight) + 5 + 'px', jsGizmo.doNum(xWidth) - 5 + 'px', jsGizmo.doNum(xHeight) + 3 + 'px', '0px', '',xFontSize, xBackColor, 'left', '', 80); 
        xPanel.appendChild(iDiv);
        document.getElementById(xID + 'List').setAttribute("onmousedown", "jsCombo.comboMouseOnList('" + xID + "')");
        document.getElementById(xID + 'List').setAttribute("onmouseup", "jsCombo.comboSelection('" + xID + "')");
        document.getElementById(xID + 'List').style.display = 'none';
        document.getElementById(xID + 'List').tabIndex = 9999;
        document.getElementById(xID + 'List').innerHTML = xItemList;
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check combobox `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
        };

       return;
    },

    
//         jsBld.bldDropdown(xPanel, 'lstStatus', '25px', locWidth * 0.2 + 'px', '255px', locWidth * 0.15 + 'px', aStatus, 11,      '#FFFFF0',    '',     '',       60,     'txtPArameter');
//    bldDropdown: function (xPanel, xID,        xHeight, xWidth,                 xTop,   xLeft,                  xText,  xFontSize, xBackColour, xAlign, xOnCLick, xZindex, xNextTab) {
    bldDropdown: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xBackColour, xAlign, xOnCLick, xZindex, xNextTab) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newDD = document.createElement("select");
        newDD.id = xID;
        newDD.name = xID;
        newDD.title = ps.Title;
        ps.tabList[xID + 'List'] = xNextTab;
        if (!xAlign) { xAlign = 'left'; }
        if (xAlign === 'centre') { xAlign = 'center'; }
        if (!xZindex) { xZindex = 10; }
        var locStyle = "z-index: " + xZindex + 
            "; height: " + xHeight +
            ";width: " + xWidth +
            ";font-Size: " + xFontSize + "pt" +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";position: absolute" +
            ";background-color: " + xBackColour +
            ";text-align: " + xAlign;
        newDD.setAttribute("style", locStyle);
        xPanel.appendChild(newDD);
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check dropdown list `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
        };
        return;
    },

    bldFileInput: function (xPanel, xID, xHeight, xWidth, xTop, xLeft ) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newFI = document.createElement('input');  
        newFI.id = xID;
        newFI.type = "file";
        var locStyle =  "z-index: 20" +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";cursor: pointer" +
            ";display: none";
        newFI.setAttribute("style", locStyle);               
        xPanel.appendChild(newFI);
        return;
    },
    
    bldHiddenButton: function (xPanel, xID, xAction) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newButton = document.createElement('button');
        newButton.id = xID;
        newButton.type = "text";
        var locStyle = "height: 50px" +
            ";position: absolute" +
            ";top: 530px"+
            ";left: 530px" +
            ";width: 50px" +
            ";text-align: center" + 
            ";display: none";
        newButton.setAttribute("style", locStyle);        
        if (ps.testhub) {
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.text', '" + xText + "')");
            newButton.addEventListener("click", function(){jsGizmo.cyClick(xID)}, true);
        }
        newButton.addEventListener("click", function(){eval(xAction)}, true);
        xPanel.appendChild(newButton);
        return;
    },
    
    bldImage: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xImage, xSize, xAction, xIndex) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var locStyle;
        if (!xSize) { xSize = 'fix'; }
        var imgURL = xImage;
        newImg = document.createElement("img");
        newImg.id = xID;
        newImg.src = imgURL;
        newImg.title = ps.Title;
        locStyle = ";top: " + xTop + ";left: " + xLeft + ";position: absolute; heigh: " + xHeight + "; width: " + xWidth + "; vertical-Align: middle; horizontal-Align: middle; max-height: " + xHeight + "; max-width: " + xWidth; 
        if (!xIndex) {} else { locStyle += "; z-index:" + xIndex; }
        newImg.setAttribute("style", locStyle);
        if (xAction) { newImg.setAttribute("onclick", "return " + xAction); }
        xPanel.appendChild(newImg);
        if (xSize !== 'fix') { 
            document.getElementById(xID).onload = function () {
                var locHDiff = (jsGizmo.doNum(document.getElementById(xID).style.maxHeight) - jsGizmo.doNum(document.getElementById(xID).height)) / 2;
                var locWDiff = (jsGizmo.doNum(document.getElementById(xID).style.maxWidth) - jsGizmo.doNum(document.getElementById(xID).width)) / 2;
                document.getElementById(xID).style.top = jsGizmo.doNum(document.getElementById(xID).style.top) + locHDiff + 'px';
                document.getElementById(xID).style.left = jsGizmo.doNum(document.getElementById(xID).style.left) + locWDiff + 'px';
            };
        }
        if (ps.testhub) { 
    //        jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check picture/image `' + xID + '` exists"};'); 
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.attr', 'src', '" + imgURL + "')");
        };
        return;
    },

    bldLabel: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xForeColour, xBackColour, xAlign, xOnCLick, xTextOffset) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xTextOffset) { xTextOffset = '0px'; }
        if (!xForeColour) { xForeColour = 'black'; }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xAlign) { xAlign = 'left'; }
        if (xAlign === 'centre') { xAlign = 'center'; }
        // create div
        var iDiv = document.createElement('div');
        iDiv.id = xID + 'x';
        iDiv.title = ps.Title;
        iDiv.setAttribute("style", "z-index: 1" +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: " + xBackColour +
            ";text-overflow : ellipsis; overflow: hidden;" +
            ";cursor: pointer" +
            ";text-align: " + xAlign +
            ";vertical-align: bottom");
        if (xOnCLick) { iDiv.setAttribute("onclick", "return " + xOnCLick + ';'); }
        //document.getElementById(xPanel).appendChild(iDiv);
        xPanel.appendChild(iDiv);

        // add label
        var newLabel = document.createElement("Label");
        newLabel.innerHTML = xText;
        newLabel.id = xID;
        var locStyle = "border-style: none" +
            ";position: relative" +
            ";top: " + xTextOffset +
            ";font-Size: " + xFontSize + "pt" +
            ";color: " + xForeColour;
        newLabel.setAttribute("style", locStyle);
//        if (xOnCLick) { newLabel.setAttribute("onclick", "return " + xOnCLick + ';'); }
        iDiv.appendChild(newLabel);
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"lablehas", elem:"' + xID + '", txt:"' + xText + '", desc:"Check `' + xID + '` lable exists"};');
           jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.text', '" + xText + "')");
        };
        return iDiv;
    },
    
    bldLine: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xBackColour, xIndex) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xIndex) { xIndex = 1; }
        // create div
        var iDiv = document.createElement('div');
        iDiv.id = xID;
        iDiv.setAttribute("style", "z-index: " + xIndex +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: " + xBackColour +
            ";text-overflow : ellipsis; overflow: hidden;");
        xPanel.appendChild(iDiv);
        return iDiv;
    },

    bldPanel: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xBackColour, xIndex, xDisplay) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xIndex) { xIndex = '1'; }
        if (!xDisplay) { xDisplay = ''; }
        newPanel = document.createElement("div");
        newPanel.id = xID;
        newPanel.setAttribute("style", "z-index: " + xIndex + 
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";position: absolute" +
            ";background: " + xBackColour +
            ";display: " + xDisplay );
        xPanel.appendChild(newPanel);
        return;
    },

    bldPicture: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xImage, xAction, xIndex, xHint) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xIndex) { xIndex = 10; }
        var newPic = document.createElement('div');
        newPic.id = xID + '_div';
        newPic.classList.add('picframe');    
        newPic.setAttribute("style", "z-index: " + xIndex +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft);
        var imgURL = xImage;
        newImg = document.createElement("img");
        newImg.id = xID;
        newImg.src = imgURL;
        newImg.title = ps.Title;
        newImg.classList.add('pic');
        
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check icon/picture `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.attr', 'src', '" + imgURL + "')");
            var arrPic = xImage.split('/');
            xAction = 'jsGizmo.thClick("Click on icon/picture","' + xID + '","' + arrPic[arrPic.length - 1] + '","' + xAction + '")'; 
        }        
        if (xAction) { newImg.setAttribute("onclick", "return " + xAction); }
        newPic.appendChild(newImg);
        xPanel.appendChild(newPic);
        return newPic;        
    },
      
    bldPicklist: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xBackColor, xHint, xNextTab, xListSize) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newTB = document.createElement('input');
        if (xBackColor === '') { xBackColor = 'transparent'; }
        if (!xText) { xText = ''; }
        newTB.id = xID;
        newTB.type = 'text';
        newTB.value = xText;
        newTB.title = ps.Title;
        newTB.autocomplete = "off";
        newTB.style.height = xHeight;
        newTB.style.width = (jsGizmo.doNum(xWidth) - 15) + 'px';
        newTB.style.top = xTop;
        newTB.style.left = xLeft;
        newTB.style.fontSize = xFontSize + "pt";
        newTB.style.position = "absolute";
        newTB.style.backgroundColor = xBackColor;
        newTB.style["paddingLeft"] = "5px";
        newTB.style["paddingRight"] = "5px";
        newTB.style.position = "absolute";
        newTB.style.zIndex = 80;
        newTB.setAttribute("onfocus", "jsControls.pickerFocus('" + xID + "')");
        newTB.setAttribute("onblur", "jsControls.pickerTextBlur('" + xID + "')");
        newTB.setAttribute("onkeyup", "jsControls.pickerFilter('" + xID + "')");

        if (xHint !== '') { newTB.placeholder = xHint; }
        newTB.placeholder.bold = true;
        var locBoxTop = jsGizmo.doNum(xTop) + jsGizmo.doNum(xHeight) + 1;
        if (xListSize < 0) { locBoxTop = jsGizmo.doNum(xTop) - 2; }
        xPanel.appendChild(newTB);
        jsBld.bldPanel(xPanel, xID + 'List', '0px', xWidth, locBoxTop + 2 + 'px', xLeft, xBackColor);
        var locListBox = document.getElementById(xID + 'List');
        locListBox.setAttribute("onmouseenter", "jsControls.pickerMouseEnter('" + xID + "')");
        locListBox.setAttribute("onmouseleave", "jsControls.pickerMouseLeave('" + xID + "')");
        locListBox.style.border = "thin solid #2F4F4F";
        locListBox.style.zIndex = 80;
        locListBox.style.display = "none";
        locListBox.tabIndex = 9999;
        locListBox.style.overflow = "auto";
        locListBox.style.overflowX = "hidden";
        ps[xID + '_Next'] = xNextTab;
        ps[xID + '_Size'] = xListSize;
        ps[xID + '_Count'] = 0;
        ps[xID + '_Index'] = -1;
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check picklist `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
        };
        return;
    },
    
    
    bldRadioNew: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xForeColour, xBackColour, xOnChange, xGroupName) {
        if (!xForeColour) { xForeColour = 'black'; }
        if (!xBackColour) { xBackColour = 'transparent'; }
        // create div
        var iDiv = document.createElement('div');
        iDiv.title = ps.Title;
        iDiv.id = xID + 'Div';
        iDiv.title = ps.Title;
        iDiv.setAttribute("style", "z-index: 1" +
            ";position: absolute" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";background: " + xBackColour +
            ";cursor: pointer" +
            ";vertical-align: bottom");
        //if (xOnCLick) { iDiv.setAttribute("onclick", "return " + xOnCLick + ';'); }

        var newRadio = document.createElement('input');
        newRadio.type = "radio";
        newRadio.id = xID;
        newRadio.name = xGroupName;
        //newRadio.value = xText;
        //newRadio.text = xText;
        ////newRadio.innerHTML = xText;
        if (xOnChange) { newRadio.setAttribute("onchange", "return " + xOnChange + ";"); }

        var newLabel = document.createElement("Label");
        newLabel.innerHTML = " " + xText;
        newLabel.id = xID + 'lbl';
        var locStyle = "border-style: none" +
            ";font-Size: " + xFontSize + "pt" +
            ";color: " + xForeColour + 
            ";left: 10%" + 
            ";width: 90%";
        newLabel.setAttribute("style", locStyle);
        iDiv.appendChild(newRadio);
        iDiv.appendChild(newLabel);
        document.getElementById(xPanel).appendChild(iDiv);
        return;
    },
    
    bldScrollPanel: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xBackColour, xIndex, xDisplay) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xBackColour) { xBackColour = 'transparent'; }
        if (!xIndex) { xIndex = '1'; }
        if (!xDisplay) { xDisplay = ''; }
        newPanel = document.createElement("div");
        newPanel.id = xID;
        newPanel.scrollbars = 'none';
//        newPanel.classList.add('panel');
        newPanel.class = 'panel';
        newPanel.setAttribute("style", "z-index: " + xIndex + 
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";position: absolute" +
            ";background: " + xBackColour +
            ";display: " + xDisplay +
            ";overflow: auto");
        xPanel.appendChild(newPanel);
        return;
    },
    
    bldStyleButton: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xForeColor, xBackColor, xBorderColor, xClass, xOnCLick, xImage) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (!xImage) { xImage = 'small-button-hi.png'; }
        if (!xForeColor) { xForeColor = 'black'; }
        if (!xBackColor) { xBackColor = '#EAECEE'; }
        if (!xBorderColor) { xBorderColor = '#909497'; }
        ps.tabindex += 1;

        // Create bas Div
        var iDiv = document.createElement('div');
        var locStylePos;
        iDiv.id = xID;
        iDiv.title = ps.Title;
        locStylePos = "z-index: 55;position: absolute; width: " + xWidth + ";height: " + xHeight + ";top: " + xTop + ";left: " + xLeft + ";background: transparent";
        //iDiv.classList.add(xClass);
        iDiv.setAttribute('align', 'center');
        iDiv.setAttribute("style", locStylePos);
        iDiv.tabIndex = ps.tabindex;

        if (xOnCLick) { iDiv.addEventListener("click", function(){eval(xOnCLick)}, true); }

        // Create image
        var imgURL = "../pubPics/" + xImage;
        newImg = document.createElement("img");
        newImg.id = xID + 'img';
        newImg.setAttribute("src", imgURL);
        locStylePos = "position: absolute; width: " + xWidth + ";height: " + xHeight + ";top: 0px; left: 0px; background: transparent; vertical-align: bottom; cursor: pointer";
        newImg.setAttribute("style", locStylePos);
        iDiv.appendChild(newImg);

        // Create Label
        var newLabel = document.createElement("Label");
        newLabel.innerHTML = xText; //.substr(0, locTextLength);
        newLabel.id = xID + 'lbl';
        var locTop = Math.floor((jsGizmo.doNum(xHeight) - xFontSize) / 2.5);
        locStylePos = "position: absolute; width: " + xWidth + ";height: " + xHeight + ";top: " + locTop + "px; color:" + xForeColor +
            ";left: 0px; background: transparent; vertical-align: bottom; cursor: pointer; font-Size: " +xFontSize + "pt";
        newLabel.setAttribute('align', 'center');
        newLabel.setAttribute("style", locStylePos);
        iDiv.appendChild(newLabel);

        xPanel.appendChild(iDiv);
        document.getElementById(xID).style.borderColor = xBorderColor;
        if (ps.testhub) {
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.text', '" + xText + "')");
            iDiv.addEventListener("click", function(){jsGizmo.cyClick(xID)}, true);
        }
        xPanel.appendChild(iDiv);
        document.getElementById(xID).style.borderColor = xBorderColor;
        return;
    },

    bldTextBox: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xBackColor, xHint, xMode) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (xBackColor === '') { xBackColor = 'transparent'; }
        if (xMode === '') { xMode = 'text'; }

        if (!xText) { xText = ''; }
        if (xMode === 'multi') { 
            var newTB = document.createElement('textarea');
            newTB.innerHTML = xText;
            newTB.rows = 5; 
        } else {
            var newTB = document.createElement('input');
            if (xMode === 'number') { newTB.pattern = "\d+(\.\d*)?"; } 
            newTB.value = xText;
        }
        ps.tabindex += 1;
        newTB.tabIndex = ps.tabindex;
        newTB.id = xID;
        newTB.name = xID;
        newTB.type = xMode;
        newTB.title = ps.Title;
//        newTB.value = xText;
        newTB.autocomplete = "off";
        newTB.style.height = xHeight;
        newTB.style.width = xWidth;
        newTB.style.top = xTop;
        newTB.style.left = xLeft;
        newTB.style.fontSize = xFontSize + "pt";
        newTB.style.position = "absolute";
        newTB.style.backgroundColor = xBackColor;
        newTB.style["paddingLeft"] = "5px";
        newTB.style["paddingRight"] = "5px";
        newTB.style.position = "absolute";
        newTB.setAttribute("onBlur", "window.scrollTo(0, 0)");
//        if (xText) { newTB.setAttribute("value", xText); }
        if (xHint !== '') { newTB.placeholder = xHint; }
        newTB.placeholder.bold = true;
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check checkbox for `' + xID + '/' + xText + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('have.text', '" + xText + "')");
            newTB.setAttribute("onchange", "return jsGizmo.cyTrackTextboxInput('" + xID + "')");
        }
        xPanel.appendChild(newTB);
        return;
    },

    bldTickBox: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xOnChange, xGroupName) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newCheck = document.createElement('input');
        ps.tabindex += 1;
        newCheck.tabIndex = ps.tabindex;
        newCheck.type = "checkbox";
        newCheck.id = xID;
        if (ps.Title) { newCheck.title = ps.Title; };
        newCheck.GroupName = xGroupName;
        newCheck.style.height = xHeight;
        newCheck.style.width = xWidth;
        newCheck.style.top = xTop;
        newCheck.style.left = xLeft;
//        newCheck.style.fontSize = xFontSize;
//        newCheck.style.color = xFontColor;
//        newCheck.style.background = xBackColour;
//        newCheck.style.fontSize = xFontSize + "pt";
        newCheck.style.position = "absolute";
        if (xOnChange) { newCheck.setAttribute("onclick", "return " + xOnChange + ";"); }
        xPanel.appendChild(newCheck);
//        if (xTop.slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
//        if (xLeft.slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
//        var xNewLeft = 5 + jsGizmo.doNum(xHeight) + jsGizmo.doNum(xLeft) + 'px';
//        var xNewTop = 3 + jsGizmo.doNum(xTop) + 'px';
//        jsBld.bldLabel(xPanel, xID + 'lbl', xHeight, xWidth, xNewTop, xNewLeft, xText, xFontSize, xFontColor, xBackColour, xAlign, '');
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check checkbox for `' + xID + '/' + xText + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')");
        };
        return;
    },

    bldCheckBox: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xText, xFontSize, xFontColor, xBackColour, xAlign, xOnChange, xGroupName) {
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        var newCheck = document.createElement('input');
        ps.tabindex += 1;
        newCheck.tabIndex = ps.tabindex;
        newCheck.type = "checkbox";
        newCheck.id = xID;
        newCheck.title = ps.Title;
        newCheck.GroupName = xGroupName;
        newCheck.style.heigh = xHeight;
        newCheck.style.width = xHeight;
        newCheck.style.top = xTop;
        newCheck.style.left = xLeft;
        newCheck.style.fontSize = xFontSize;
        newCheck.style.color = xFontColor;
        newCheck.style.background = xBackColour;
        newCheck.style.fontSize = xFontSize + "pt";
        newCheck.style.position = "absolute";
        if (xOnChange) {
//            newCheck.setAttribute("onchange", "return " + xOnChange + ";");
            newCheck.setAttribute("onclick", "return " + xOnChange + ";");
        }
        xPanel.appendChild(newCheck);
        if (xTop.slice(-1) === "%")  { xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xPanel.style.height) + 'px'; }
        if (xLeft.slice(-1) === "%")  { xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xPanel.style.width) + 'px'; }
        var xNewLeft = 5 + jsGizmo.doNum(xHeight) + jsGizmo.doNum(xLeft) + 'px';
        var xNewTop = 3 + jsGizmo.doNum(xTop) + 'px';
        jsBld.bldLabel(xPanel, xID + 'lbl', xHeight, xWidth, xNewTop, xNewLeft, xText, xFontSize, xFontColor, xBackColour, xAlign, '');
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check checkbox for `' + xID + '/' + xText + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
        };
        return;
    },

    bldHidden: function (xPanel, xID, xText) {
        var newHidden = document.createElement('input');
        newHidden.id = xID;
        newHidden.type = "hidden";
        newHidden.value = xText;
        document.getElementById(xPanel).appendChild(newHidden);
        return;
    },

    bldDropArea: function (xPanel, xID, xHeight, xWidth, xTop, xLeft, xLink, xBackColour, xFilenameLable) {
        if (!xBackColour) { xBackColour = 'transparent'; }
        newArea = document.createElement("div");
        newArea.id = xID;
        newArea.setAttribute("style", "z-index: 20" +
            ";width: " + xWidth +
            ";height: " + xHeight +
            ";top: " + xTop +
            ";left: " + xLeft +
            ";position: absolute" +
            ";background: " + xBackColour);
        newArea.style.border = "2px dotted lightgray";
        newArea.classList.add('droptarget');
        document.getElementById(xPanel).appendChild(newArea);

        newArea.addEventListener("dragenter", function (event) {
            if (event.target.className === "droptarget") {
                event.target.style.border = "3px dotted red";
            }
        });
        newArea.addEventListener("dragleave", function (event) {
            if (event.target.className === "droptarget") {
                event.target.style.border = "2px dotted lightgray";
            }
        });
        newArea.addEventListener("dragover", function (event) {
            if (event.target.className === "droptarget") {
                event.target.style.border = "3px dotted red";
            }
        });
        newArea.addEventListener("drop", function (event) {
            event.preventDefault();
            if (event.target.className === "droptarget") {
                event.target.style.border = "2px dotted green";
                jsUploader.handleDrop(event, xID, xPanel, xHeight, xWidth, xTop, xLeft, xLink, xFilenameLable);
            }
        });
            var impPicture = document.getElementById('impPicture');
            impPicture.addEventListener("change", function (impPicture) {
            jsUploader.handleSelection('impPicture', xID, xPanel, xHeight, xWidth, xTop, xLeft, xLink, xFilenameLable);
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            newArea.addEventListener(eventName, jsUploader.preventDefaults, false);
            document.body.addEventListener(eventName, jsUploader.preventDefaults, false);
        });
        if (ps.testhub) {
//            jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"exists", elem:"' + xID + '", desc:"Check droparea `' + xID + '` exists"};');
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]')"); 
        };
    },

    cloneMe: function(xArgs) {
        if (document.getElementById(xArgs['id'])) { 
            if (!xArgs['pnl']) { xArgs['pnl'] = document.getElementById(xArgs['id'] + 'x').parentNode.id; }
            if (document.getElementById(xArgs['id'] + 'x')) { 
                var clonedTarget = document.getElementById(xArgs['id'] + 'x').cloneNode();
                var clonedTargetChld = document.getElementById(xArgs['id']).cloneNode(true);
                clonedTarget.id = xArgs['newid'] + 'x';
                if (xArgs['height']) { clonedTarget.style.height = xArgs['height']; }
                if (xArgs['width']) { clonedTarget.style.width = xArgs['width']; }
                if (xArgs['top']) { clonedTarget.style.top = xArgs['top']; }
                if (xArgs['left']) { clonedTarget.style.left = xArgs['left']; }
                if (xArgs['bground']) { clonedTarget.style.background = xArgs['bground']; }
                if (xArgs['zind']) { clonedTarget.zindex = xArgs['zind']; }
                if (xArgs['align']) { clonedTarget.style.textAlign = xArgs['align']; }
            
                clonedTargetChld.id = xArgs['newid'];
                if (xArgs['fsize']) { clonedTargetChld.style.fontSize = xArgs['fsize']; }
                if (xArgs['color']) { clonedTargetChld.style.color = xArgs['color']; }
                if (xArgs['text']) { clonedTargetChld.innerHTML = xArgs['text']; }
            
                clonedTarget.appendChild(clonedTargetChld);
            } else {
                var clonedTarget = document.getElementById(xArgs['id']).cloneNode(true);
                clonedTarget.id = xArgs['newid'];
                if (xArgs['height']) { clonedTarget.style.height = xArgs['height']; }
                if (xArgs['width']) { clonedTarget.style.width = xArgs['width']; }
                if (xArgs['top']) { clonedTarget.style.top = xArgs['top']; }
                if (xArgs['left']) { clonedTarget.style.left = xArgs['left']; }
                if (xArgs['bground']) { clonedTarget.style.background = xArgs['bground']; }
                if (xArgs['zind']) { clonedTarget.zindex = xArgs['zind']; }
                if (xArgs['fsize']) { clonedTarget.style.fontSize = xArgs['fsize']; }
                if (xArgs['color']) { clonedTarget.style.color = xArgs['color']; }
                if (xArgs['text']) { clonedTarget.innerHTML = xArgs['text']; }
                if (xArgs['align']) { clonedTarget.style.textAlign = xArgs['align']; }
            }   
            document.getElementById(xArgs['pnl']).appendChild(clonedTarget);                   
        }
        return;
    },
    
    resizeElement: function (xParent, xPanel, xHeight, xWidth, xTop, xLeft, xDisplay) {
        if (typeof xParent === 'string') { xParent = document.getElementById(xPanel); }
        if (typeof xPanel === 'string') { xPanel = document.getElementById(xPanel); }
        if (xParent.style.height.slice(-2) === 'px') {
            if (xHeight !== '') { if (('x' + xHeight).slice(-1) === "%") { 
                xHeight = jsGizmo.doNum(xHeight) * 0.01 * jsGizmo.doNum(xParent.style.height) + 'px'; } }
            if (xWidth !== '') { if (('x' + xWidth).slice(-1) === "%") {  
                xWidth = jsGizmo.doNum(xWidth) * 0.01 * jsGizmo.doNum(xParent.style.width) + 'px'; } }
            if (xTop !== '') { if (('x' + xTop).slice(-1) === "%")  {
                xTop = jsGizmo.doNum(xTop) * 0.01 * jsGizmo.doNum(xParent.style.height) + 'px'; } }
            if (xLeft !== '') { if (('x' + xLeft).slice(-1) === "%")  {
                xLeft = jsGizmo.doNum(xLeft) * 0.01 * jsGizmo.doNum(xParent.style.width) + 'px'; } }
        }
        xPanel.style.height = xHeight; 
        xPanel.style.width = xWidth; 
        xPanel.style.top = xTop; 
        xPanel.style.left = xLeft;         
        if (xDisplay) { xPanel.style.display = xDisplay; }
        return;
    },
    
    setPanel: function (xPanel, xHeight, xWidth, xTop, xLeft, xDisplay, xIndex) {
        if (xHeight !== '') { document.getElementById(xPanel).style.height = xHeight; }
        if (xWidth !== '') { document.getElementById(xPanel).style.width = xWidth; }
        if (xTop !== '') { document.getElementById(xPanel).style.top = xTop; }
        if (xLeft !== '') { document.getElementById(xPanel).style.left = xLeft; }
        if (xDisplay) { document.getElementById(xPanel).style.display = xDisplay; }
        if (xIndex !== '') { document.getElementById(xPanel).style.zIndex = xIndex; }
        return;
    }
};