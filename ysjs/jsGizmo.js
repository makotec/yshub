// Version 2022.0715.1545
//
jsGizmo = {

    jsGizmo_info: function () { return 'jsGizmo|2022.0715.1545'; },

    agentDiversion: function (xPage, xSubdom) {
        var locAgent = "web";
        ps.sl = 30;
        if( /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            locAgent = "mob";
            ps.sl = 50;
        }
        if( /iPad/i.test(navigator.userAgent) ) {
            locAgent = "tab";
            ps.sl = 60;
        }
        jsGizmo.goto(xPage + "." +locAgent + '.php', xSubdom); 
        return;
    },
    
    bldDropdownList: function (xData) {
        var locList = '';
        var myItem = xData.split('|');
 //       console.log('droplist: ' + xData);
        myItem.forEach((item) => {
            locList += '<option value="' + item + '">' + item +'</option>';
        });
        return locList;
    },

    myScreen: function () {
        ps.sl = 25;
        if( /Android|Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            ps.sl = 30;
        }
        if( /iPad/i.test(navigator.userAgent) ) {
            ps.sl = 25;
        }
        ps.BH = window.innerHeight;
        ps.BW = window.innerWidth;
        return;
    },

    apiDoPost: function (locURL, httpString, callback, xPanel) {
 //       alert('callback set to ' + callback);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", locURL, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.setRequestHeader('charset', 'utf-8');
        xmlHttp.send(httpString);
        xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var locResp = xmlHttp.responseText.substring(1, xmlHttp.responseText.length);
                var arrData = jsGizmo.paramSplit(locResp);
//                if (arrData[1] === 'OK') { alert('response: OK'); alert('callback of ' + arrData[2]); callback(arrData[2], xPanel); };
                if (arrData[1] === 'OK') { callback(arrData[2], xPanel); };
                if (arrData[1] === 'ERR') { alert('API ERROR'); };
                ps.pageload = 5;
                return true;
            }
        };
        return true;
    },

    apiDoSyncPost: function (locURL, httpString, callback, xPanel) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", locURL, false);
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.setRequestHeader('charset', 'utf-8');
        xmlHttp.send(httpString);
        xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var locResp = xmlHttp.responseText.substring(1, xmlHttp.responseText.length);
                var arrData = jsGizmo.paramSplit(locResp);
                if (arrData[1] === 'OK') { callback(arrData[2], xPanel); };
                if (arrData[1] === 'ERR') { alert('API ERROR'); };
                ps.pageload = 5;
                return true;
            }
        };
        return true;
    },    
    
    
    
    apiDoGet: function (locURL, httpString, callback, xPanel) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", locURL + httpString, true);

        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.setRequestHeader('charset', 'utf-8');
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                var locResp = xmlHttp.responseText.substring(1, xmlHttp.responseText.length);
                var arrData = jsGizmo.paramSplit(locResp);
                if (arrData[1] === 'OK') { callback(arrData[2], xPanel); };
                if (arrData[1] === 'ERR') { alert('API ERROR'); };
                return true;
            }
        };
        return true;
    },    
    apiPost: function (locTarget, httpString, callback, xPanel) {
        var locURL = jsGizmo.getDomainPath(-1) + locTarget;
        jsGizmo.apiDoPost(locURL, httpString, callback, xPanel)
        return true;
    }, 
    
    clearText: function (paramText) {
        paramText = paramText.replace(/&amp;/gi, '&');
        paramText = paramText.replace(/&lt;/gi, '>');
        paramText = paramText.replace(/&gt;/gi, '<');
        return paramText;
    },
    
    callbackDummy: function(xData, xPage) {
        return true;
    },
    
    cancelPanel: function (xPanel) {
        if (document.getElementById('pnlMsg')) { document.getElementById('pnlMsg').style.display = 'none'; }
        if (xPanel) { document.getElementById(xPanel).style.display = 'none'; }
        document.getElementById('imgSpinner').style.display = 'none';
        return false;
    },
    
    cmdNo: function () {
        document.getElementById('pnlMsg').style.display = 'none'; 
        return false;
    },
    
    cmdYes: function (xAction) {
        document.getElementById('pnlMsg').style.display = 'none';
        if (xAction) { eval(xAction); }
        return false;
    },
    
    cmdOK: function () {
        document.getElementById('pnlMsg').style.display = 'none'; 
        return false;
    },
    
    cookieDelete: function(xCName) {
        document.cookie = xCName + '=; Max-Age=-99999999;';  
        return true;
    },
  
    cookieRead: function(xCName) {
        var locCookie = document.cookie.split(';');
        for (var iCnt = 0; iCnt < locCookie.length; iCnt++) {
            if (locCookie[iCnt].indexOf(xCName) >= 0) { return locCookie[iCnt].substr(locCookie[iCnt].indexOf("=") + 1); };
        }
        return false;
    },

    cookieWrite: function (xCName, xcValue, xLifetime) {
        if (!xLifetime) { xLifetime = 'expires=Wed, 8 Aug 2063 12:00:00 UTC';};
        document.cookie = xCName + '=' + xcValue + '; ' + xLifetime;
        return true;
    },
    
    date2string: function (today) {
        var d = ("0" + today.getFullYear()).slice(-4) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
        return d;
    },

    diffDate: function (xStartDate, xEndDate) {
        datStart = new Date(xStartDate);
        datEnd = new Date(xEndDate);
        return Math.abs((datEnd - datStart)/1000/3600/24);
    },
    
    doCurrency: function (myAmount, decimals, thousands_sep, decimal_sep, currency) {
        if (isNaN(myAmount) === true) {
            if (myAmount === "NaN;") {
                myAmount = '0.00';
            }
        }
        myAmount = myAmount + ' ';
        if (myAmount.indexOf(",") >= 0) {
            myAmount = myAmount.replace(/,/gi, "");
        }
        myAmount = myAmount.replace(/ /gi, "");
        myAmount = +myAmount;
        c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
            d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
            t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
            sign = (myAmount < 0) ? '-' : '',
            i = parseInt(myAmount = Math.abs(myAmount).toFixed(c)) + '',
            j = ((j = i.length) > 3) ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(myAmount - i).toFixed(c).slice(2) : '');
    },
    
    doNum: function (myAmountText) {
        var locFactor = 1;
        var wrkAmount = ("'" + myAmountText).replace(/[^\d.-]/g, '');
        if (wrkAmount.substr(0, 1) === '-') { locFactor = -1; }
        wrkAmount = locFactor * wrkAmount.replace(/-/g, '');
        if (wrkAmount.length === 0 || isNaN(wrkAmount)) { wrkAmount = '0'; }
        return wrkAmount;
    },
    
    doReversedate: function (xDate) {
        return xDate.substr(6,4) + '-' + xDate.substr(3,2) + '-' + xDate.substr(0,2); 
    },
    
    flashIcon: function (xIcon, xSize, xTop) {
        document.getElementById('imgSpinner').style.display = 'none';
        jsBld.bldImage('pnlBody', 'imgflashicon', xSize + 'px', xSize + 'px', ps.BH * xTop + 'px', ps.BW * 0.5 - (xSize/2) + 'px', xIcon);
        setTimeout(jsGizmo.flashIconDone, 3000);
        return true;
    },
       
    flashIconDone: function () {
        if (document.getElementById('imgflashicon')) {
            document.getElementById('imgflashicon').remove();
        } 
        return true;
    },

    getDomainPath: function (xOffset = 0) {
        var arrRoot = window.location.href.split(".php");
        var arr = arrRoot[0].split("/");
        var ret = arr[0];
        for (var i = 1; i < 3; i++) {
            ret = ret + '/' + arr[i];
        }
         return ret;
    },
    
    getBrowserDate: function() {
        var today = new Date();
        var d = ("0" + today.getFullYear()).slice(-4) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
        return d;
    },
    
    getBrowserDateTime: function() {
        var today = new Date();
        var d = ("0" + today.getFullYear()).slice(-4) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2) + ' ' +
            ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2) + "." + ("000" + today.getMilliseconds()).slice(-3);
        return d;
    },
      
    getAppID: function () {
        var arrRoot = window.location.href.split(".php");
        var arr = arrRoot[0].split("/");
//        var ret = arr[0];
//        for (var i = 1; i < arr.length - 1; i++) {
//            ret = ret + '/' + arr[i];
//        }
        return arr[arr.length - 2];
    },
    
    getPath: function () {
        var arrRoot = window.location.href.split(".php");
        var arr = arrRoot[0].split("/");
        var ret = arr[0];
        for (var i = 1; i < arr.length - 1; i++) {
            ret = ret + '/' + arr[i];
        }
        return ret;
    },
    
    getToday: function () {
        var today = new Date();
//        var d = ("0" + today.getFullYear()).slice(-4) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2) + ' ' +
//            ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2);
        return ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-4);
    },
    
    goto: function (xPage, xSubdom = '', xParam= '' ) {
        if (xPage.substring(0, 4) === 'http') {
            window.location = xPage;
        } else {
            var locURL = document.URL.split("?");
            var newURL = locURL[0].substring(0, locURL[0].lastIndexOf('/'));
            if (xSubdom !== '') {
                var sPathSeg = locURL[0].split('/');
                newURL = sPathSeg[0] + '/' +sPathSeg[1] + '/' +sPathSeg[2] + '/' + xSubdom;
            }
        }
        if (xParam !== '') {
           if (locURL[1]) {
               locURL[1] = xParam + '&' + locURL[1];
           } else {
               locURL[1] = xParam;
           }
        }  
        if (xParam !== 'init' && locURL[1]) {
            xPage += '?' + locURL[1];
        } 
        window.location = newURL + '/' + xPage;
        return;
    },
    
    hide: function (xPanel) {
        if (xPanel) {document.getElementById(xPanel).style.display = "none";}
        if (ps.testhub) {
            jsGizmo.cyWrite("        cy.get('[id=" + xPanel + "]').should('not.be.visible');)");
            newButton.addEventListener("click", function(){jsGizmo.cyClick(xPanel)}, true);
        }        
        return true;
    },
    
    hideMenu: function (xPanel) {
        document.getElementById(xPanel).style.display = "none";
        if (ps.myMenuTimer > 0) { clearTimeout(ps.myMenuTimer); }
    },
        
    hideMsg: function() {
        if (document.getElementById('pnlMsg')) { document.getElementById('pnlMsg').remove(); }
        return true;
    },
    
    initPage: function(xBackground) {
        xPanel = 'pnlBody';
        ps.browsertime = jsGizmo.getBrowserDateTime();
        jsGizmo.myScreen();
        jsBld.setPanel(xPanel, ps.BH + 'px', ps.BW + 'px', '0px', '0px', );
        if (!xBackground) { document.getElementById(xPanel).style.backgroundColor = xBackground;};
        document.getElementById(xPanel).style.display = '';
        jsBld.bldImage(xPanel, 'imgSpinner', '30px', '30px', ps.BH * 0.4 + 'px', ps.BW * 0.5 - 15 + 'px', '../pubPics/spinner.gif','','', 90);
        document.getElementById('imgSpinner').style.display = 'none';
        return;
    },
    
    onDownload: function (uri) {
        var link = document.createElement('download');
        if (typeof link.download === 'string') {
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
        document.body.style.cursor = 'default';
        return false;
    },
    
    paramSplit: function(xParam) {
        var arrParam = [];
        var locTag='';
        var iEnd = xParam.length;
        var iStart = xParam.indexOf('<0>') + 3;
        var paramCount = xParam.substring( iStart, xParam.indexOf('<1>') );
        
        for (var ii = paramCount; ii > 0; ii--) {
            locTag = '<' + ii + '>';
            iStart = xParam.indexOf(locTag);
            arrParam[ii] = xParam.substring(iStart + locTag.length,iEnd );
            iEnd = iStart;
        }
        return arrParam;
    },    

    randomID: function (){
        var datNow = new Date();
        varID = ("0" + datNow.getDate()).slice(-2) + ("0" + (datNow.getMonth() + 1)).slice(-2) + datNow.getFullYear() + ("0" + (datNow.getHours())).slice(-2) +
                ("0" + (datNow.getMinutes())).slice(-2) + ("0" + (datNow.getSeconds())).slice(-2) + ("0000" + (datNow.getMilliseconds())).slice(-2);
    },
      
    setEnterEvent(xFunc) {
        window.addEventListener('keydown', f=function (e) {
            if (e.keyIdentifier === 'Enter' || e.keyCode === 13) {
                if (e.target.nodeName === 'INPUT' && e.target.type !== 'txtKey') { 
                    e.preventDefault(); 
                    eval(xFunc()); 
                    window.removeEventListener('click',f);
                    return false;
                }
            }
        }, true);    
    },
    
    show: function (xPanel) {
        document.getElementById(xPanel).style.display = '';
        if (ps.testhub) {
            jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').should('be.visible');)");
            newButton.addEventListener("click", function(){jsGizmo.cyClick(xID)}, true);
        } 
        return true;
    },
    
    showMSG: function (xHeader, xLine1, xLine2, xType, xAction, xWidth, xTime) { 
        if (document.getElementById('imgSpinner')) { document.getElementById('imgSpinner').style.display = 'none'; }
        var locHeight = 10;
        var xWidthFactor = 0.45;
        if (xWidth) { xWidthFactor = jsGizmo.doNum(xWidth) / 100; }
        if (document.getElementById('pnlMsg')) {
            document.getElementById('pnlMsg').remove();
        }
        if (!xAction) { xAction = 'jsGizmo.hideMsg()';}
        jsBld.bldBox('pnlBody', 'pnlMsg', '150px', (ps.BW * xWidthFactor) + 'px', (ps.BH * 0.3) + 'px', (ps.BW * (1 - xWidthFactor) / 2) + 'px', 'White', 20, '');
        document.getElementById('pnlMsg').style.zIndex = 80;
        document.getElementById('pnlMsg').style.borderColor = 'green';
        document.getElementById('pnlMsg').style.borderStyle = 'Solid';
        document.getElementById('pnlMsg').innerHTML = "";
        if (xHeader !== '') {
            jsBld.bldLabel('pnlMsg', 'lblMsgHeader', '20px', ps.BW * xWidthFactor + 'px', locHeight + 'px', '0px', xHeader, 14, 'Red', '', 'center');
            locHeight += 30;
        }
        if (xLine1 !== '') {
            jsBld.bldLabel('pnlMsg', 'lblMsgLine1', '20px', ps.BW * xWidthFactor + 'px', locHeight + 'px', '0px', xLine1, 12, 'blue', '', 'center');
            locHeight += 30;
        }
        if (xLine2 !== '') {
            jsBld.bldLabel('pnlMsg', 'lblMsgLine2', '20px', ps.BW * xWidthFactor + 'px', 10 + locHeight + 'px', '0px', xLine2, 12, 'blue', '', 'center');
            locHeight += 30;
        }
        if (xType === 'OK' || xType === '') {
            jsBld.bldButton('pnlMsg', 'cmdOK', '30px', '60px', 5 + locHeight + 'px', ps.BW * xWidthFactor * 0.5 - 30 + 'px', 'ok', xAction, 12, 'lightgreen');
            locHeight += 50;
        }
        if (xType === 'YN') {
            jsBld.bldButton('pnlMsg', 'cmdNo', '30px', '60px', 5 + locHeight + 'px', ps.BW * xWidthFactor * 0.2 + 'px', 'No', 'jsGizmo.cmdNo()', 12, 'tomato');
            jsBld.bldButton('pnlMsg', 'cmdYes', '30px', '60px', 5 + locHeight + 'px', ps.BW * xWidthFactor * 0.8 - 60 + 'px', 'Yes', "jsGizmo.cmdYes('" + xAction + "')", 12, 'lightgreen');
            locHeight += 50;
        }
        if (xTime) {
            ps.MsgTimer = setTimeout(jsGizmo.hideMsg, 1000 * xTime);
        }

        document.getElementById('pnlMsg').style.height = locHeight + 'px';
        jsBld.setPanel('pnlMsg', locHeight + 'px', ps.BW * xWidthFactor + 'px', ps.BH * 0.3 + 'px', ps.BW * (1 - xWidthFactor) / 2 + 'px');
        document.getElementById('pnlMsg').style.display = '';
        return true;
    },
    
    thClick: function (xDesc, xID, xText, xAction) {
        jsGizmo.thWrite('            tc[tc.length] = {id:"smy-20000", act:"click", elem:"' + xID + '", desc:"' + xDesc + ': `' + xText + '`"};');
        eval (xAction);
        return true;
    }, 
    
    thSetValue: function (xDesc, xID, xAction) {
        var locValue = document.getElementById(xID).value;
        jsGizmo.thWrite('    value        tc[tc.length] = {id:"smy-20000", act:"TextBoxSet", elem:"' + xID + '", txt:"' + locValue + '", desc:"Set value of ' + xDesc + ' ' + xID + ' to `' + locValue + '`"};');
        window.scrollTo(0, 0);
        eval (xAction);
        return true;
    }, 
    
    tracelog: function (xString) {
        var locPost = '<0>2<1>9540<2>' + xString + '|' + jsGizmo.getBrowserDateTime();
 //       console.log('tracelog: ' + locPost);
        jsGizmo.apiPost('/rest/apiSys.php', locPost, jsGizmo.callbackDummy,'', '');
        return true;
    },    
    
    thWrite: function (xString) {
        var locPost = '<0>2<1>9535<2>' + xString;
        jsGizmo.apiPost('/rest/apiSys.php', locPost, jsGizmo.callbackDummy,'', '');
        return true;
    },  
    
    //   Cypress.io functions
        
    cyClick: function (xID) {
        jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').click()");
        return true;
    }, 

    cyInit: function (xMode, xSessionMode, xDBInit) {
        if (!xMode) { xMode = false; };
        if (!xDBInit) { xDBInit = 0; };
        if (xMode === true || xSessionMode === 'yes' ) { 
            ps.testhub = true;
//            console.log('testhub trigger set');
            if (xDBInit !== 0 ) {
                var locPost = '<0>2<1>' + xDBInit + '<2>DBINIT';
                jsGizmo.apiPost('/rest/apiCypress.php', locPost, jsGizmo.callbackDummy,'', '');
            };
        };
    },
    
    cyTrackTextboxInput: function (xID) {
        jsGizmo.cyWrite("        cy.get('[id=" + xID + "]').type('" + document.getElementById(xID).value + "')");
        return true;
    }, 
    
    cyWrite: function (xString) {
//        alert('xxx = ' + jsGizmo.getDomainPath(0));
//        alert('xxx = ' + jsGizmo.getDomainPath(1));
//        alert('getpath = ' + jsGizmo.getAppID());
//        alert('href = ' + window.location.href);
        var locPost = '<0>2<1>9800<2>' + xString + '|' + jsGizmo.getAppID() + '|' + jsGizmo.getBrowserDateTime();
        jsGizmo.apiPost('/rest/apiCypress.php', locPost, jsGizmo.callbackDummy,'', '');
        return true;
    }
};

g = {
    HH: function (fact) { return ps.BH * fact + 'px';},
    WW: function (fact) { return ps.BW * fact + 'px';},
    sl: function (fact) { return ps.sl * fact + 'px';}
};