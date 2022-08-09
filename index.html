<xhtml xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>smoney home - web</title>
        <?php include('../phpCode/webHeader.php'); ?>

        <style>
            .picframe { display: flex; align-items: center; }
            .pic { margin-left: auto; margin-right: auto; max-width: 100%; max-height: 100%; }
        </style>

    </head>

    <body id ="webBody">
        <div id="pnlBody" style="z-index: 1; position: absolute; background: #005151;"></div> 
    </body>

    <script src="./ysjs/jsBld.js?version=2022.0715.1545"></script>
    <script src="./ysjs/jsGizmo.js?version=2022.0715.1545"></script>
<!--    <script src="../jsCode/jsGizmo.js?version=2022.0715.1545"></script>
    <script src="../jsCode/jsSMY.js?version=2022.0715.1545"></script>
    <script src="../jsCode/jsUser.js?version=2022.0715.1545"></script>-->
    <script>

        var ps = {};
        window.onload = function () {
  //      alert('here we go');
        jsGizmo.initPage('white');
            ps.cookiename = 'makotecmoneykey';
   //         ps.UserID = "<?php echo $_SESSION['UserID']; ?>";
//    console.log('userid: ' + ps.UserID);
            ps.sl = ps.BH * 0.04;
            ps.fs = 10;
//            jsUser.get
            drawBasePage('pnlBody');  
        };

        function drawBasePage(xPanel) {
            document.getElementById(xPanel).innerHTML = '';
   //         jsBld.bldImage(xPanel, 'imgSpinner', '80px', '80px', ps.BH * 0.4 + 'px', ps.BW * 0.5 - 40 + 'px', '../pubPics/spinner.gif','','', 90);
   //        document.getElementById('imgSpinner').style.display = 'none';
   //         var locKey = jsGizmo.cookieRead(ps.cookiename);
            
            jsBld.bldBoxPanel(xPanel, 'bxLogin', ps.BH * 1, ps.BW * 1, ps.BH * 0.0, ps.BW * 0.0, 'white', 0,'');
            jsBld.bldPicture('bxLogin', "imglogo", '40%', '40%', '10%', '30%','./pubPics/newmakoteclogo.png');
            jsBld.bldLabel('bxLogin', 'txttext', '10%', '100%', '60%', '1%', 'Welcome to yscomm', ps.fs * 4.9, 'Black', '', 'centre', '', '5px');
            jsBld.bldBoxButton('bxLogin', 'bttnyscommwin', ps.fs * 2.5 + 'px', '12%', '75%', '44%', 'yscomm.winn',"yscommwin()", ps.fs, 'Blue', 'White');


//            if (locKey === false || locKey ==='' || locKey === 'undefined') {
//                jsBld.bldBoxInput('bxLogin', 'txtMyEmail', g.sl(0.9), '50%', '55%', '25%', '', ps.fs, 'white', 'Email', 'text', 'black', 10);
//                jsBld.bldBoxInput('bxLogin', 'txtMyPassword', g.sl(0.9), '50%', '65%', '25%', '', ps.fs, 'white', 'Password', 'password', 'black', 20);
//                jsBld.bldBoxButton('bxLogin', 'bttnLogin', g.sl(0.9), '30%', '85%', '35%', 'login',"jsUser.emailLoginSMY('smy.home')", ps.fs, '#005151', 'White', 30);
//                document.getElementById('txtMyEmail').focus();
//            } else {  
//                jsBld.bldAction("imglogo","onclick","forceEmailLogin()",30);
// //               console.log('keylogin');
//                jsBld.bldBoxButton('bxLogin', 'bttnLogin', g.sl(0.9), '30%', '70%', '35%', 'login',"jsUser.keyLogin('" + locKey + "','smy.home')", ps.fs, '#005151', 'White', 30);
//        //        jsBld.bldButton(xPanel, "bttnLogin", '40px', '120px', ps.BH * 0.7 + 'px', ps.BW *  "jsUser.keyLogin('" + locKey + "','lb.home')", 12);
//            }           
            return true; 
        }  

        function yscommwin() {
            window.location = 'https://yscomm.win?src=yshub';
            return;
        }
        
        function forceEmailLogin() {
            jsGizmo.cookieDelete(ps.cookiename);
            drawBasePage('pnlBody');
            return;
        }
        
        function loginDone(xData, xPage) {
            locData = xData.split('|');
            var sk = "<?php echo $_SESSION['UserID']; ?>";
            if (locData[1] === 'Incorrect Credentials') {
                document.getElementById('pnlLoginPin').style.display = 'none';
                jsGizmo.flashIcon();
                return true;
            }          
            jsGizmo.cookieWrite(ps.cookiename,locData[2]);
        //    jsGizmo.goto(xPage + '.web.php?stkn=' + locData[1]);
            jsGizmo.goto('smy.home.web.php','','stkn=' + locData[1]);
            return true;
        }         
        
        function badLogin() {
            jsGizmo.hide('pnlMsg');
            forceEmailLogin();
        }

    </script>
</xhtml>
