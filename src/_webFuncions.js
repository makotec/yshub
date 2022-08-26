

export function getURLparam(strURL, strParam) {
    var ret = -1;
    const locURLsplit = document.URL.split("?");
    if (locURLsplit.length > 1) {
        const locPairs = locURLsplit[1].split("&");
        locPairs.forEach(function (item) {
            if (item.indexOf(strParam) >= 0) {
                const paramPair = item.split('=');
                ret = paramPair[1];
            } 
          }
        )
    }
    return ret;
}

export function goURL(xPage, xSubdom = '', xParam= '' ) {
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
}
    
export function aaaa (xAA) {
    alert ('button xx ' + xAA);
    window.location = xAA;
    return;
}
