/* Sniff Sniff */

var agt=navigator.userAgent.toLowerCase();
var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);

var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
var is_nav4 = (is_nav && (is_major == 4));
var is_nav6up = (is_nav && (is_major >= 5));
var is_gecko = ((agt.indexOf('gecko') != -1) && (agt.indexOf('khtml') == -1));
var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );

var is_win32 = (((is_major >= 4) && (navigator.platform == "Win32")) ||
                (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));


/* Browser Based Style Inlining */
if(is_nav4) {
  linkCSS("private/style/ns4.css");
} else if(is_nav6up) {
  linkCSS("private/style/ns6.css"); 
} else if(is_ie6) {
  linkCSS("private/style/ie6.css");
} else if(is_ie && is_win32) { 
  linkCSS("private/style/ie.css");
}


// 2L menus
var activeM=""; 

/* Utility */
function linkCSS(a) {
  document.write("<link rel='stylesheet' href='" + linkRef + a + "' type='text/css' media='screen' />");
}

/* Dreamweaver standard functions */

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

function showM() {
  var a=showM.arguments[0];
  hideM();
  if (a.length) {
    if(isnt_selected(a)) {
      MM_swapImage(''+a,'',linkRef+'images/menus/new/'+a+'-a.gif',1);
      activeM=a;
    } else {
      MM_swapImage(''+a,'',linkRef+'images/menus/new/'+a+'-hi-a.gif',1);
      activeM=a;
    }
  }
}

function hideM() {
  if (activeM) { 
    if(isnt_selected(activeM)) {
      MM_swapImage(''+activeM,'',linkRef+'images/menus/new/'+activeM+'.gif',1); 
      activeM = "";
    } else {
      MM_swapImage(''+activeM,'',linkRef+'images/menus/new/'+activeM+'-hi.gif',1); 
      activeM = "";
    }
  }
}

function isnt_selected(a) {
  if((x=MM_findObj(a))!=null) {
    if(x.src.substr(-6,6) == 'hi.gif' || x.src.substr(-8,8) == 'hi-a.gif') {
      return false;
    }
  }
  return true;
}

function preloadM() {
 var a=linkRef+'images/menus/new/'; 
 MM_preloadImages(a+'grey.gif',a+'M1-a.gif',a+'M2-a.gif',a+'M3-a.gif',a+'M4-a.gif',a+'M5-a.gif',a+'M6-a.gif'); 
}

/* NDE JS Menus */
function cssjsmenu(menuid)
{
  var i;
  var j;
  var node;
  var child;
  var parent;

  // required b/c NS4.76 seems to return true on above check
  // messed up, I know; only in this function... not in main
  if(is_nav4) { 
    return true; 
  }

  // if the browser doesn't even support
  // document.getElementById, give up now.
  if (!document.getElementById)
  {
    return true;
  }

  // check for downlevel browsers
  // Opera 6, IE 5/Mac are not supported

  var version;
  var offset;

  offset = navigator.userAgent.indexOf('Opera');
  if (offset != -1)
  {
    version = parseInt('0' + navigator.userAgent.substr(offset + 6), 10);
    if (version < 7)
    {
      return true;
    }
  }

  offset = navigator.userAgent.indexOf('MSIE');
  if (offset != -1)
  {
    if (navigator.userAgent.indexOf('Mac') != -1)
    {
      return true;
    }
  }

  var menudiv = document.getElementById(menuid);

  // ul
  var ul = new Array();

  for (i = 0; i < menudiv.childNodes.length; i++)
  {
    node = menudiv.childNodes[i];
    if (node.nodeName == 'UL')
    {
      ul[ul.length] = node;
    }
  }

  // ul > li
  var ul_gt_li = new Array();

  for (i = 0; i < ul.length; i++)
  {
    node = ul[i];
    for (j = 0; j < node.childNodes.length; j++)
    {
      child = node.childNodes[j];
      if (child.nodeName == 'LI')
      {
        ul_gt_li[ul_gt_li.length] = child;
        child.style.display = 'inline';
        child.style.listStyle = 'none';
        child.style.position = 'static';
      }
    }
  }

  // ul > li > ul
  var ul_gt_li_gt_ul = new Array();

  for (i = 0; i < ul_gt_li.length; i++)
  {
    node = ul_gt_li[i];
    for (j = 0; j < node.childNodes.length; j++)
    {
      child = node.childNodes[j];
      if (child.nodeName == 'UL')
      {
        ul_gt_li_gt_ul[ul_gt_li_gt_ul.length] = child;
        child.style.position = 'absolute';
        child.style.left = '-13em';
        child.style.visibility = 'hidden';

        // attach hover to parent li
        parent = child.parentNode;
        parent.onmouseover = function (e)
        {
          var i;
          var child;
          var point;

          // stop the pure css hover effect
          this.style.paddingBottom = '0';

          for (i = 0; i < this.childNodes.length; i++)
          {
            child = this.childNodes[i];
            if (child.nodeName == 'UL')
            {
              point = getPageXY(this);
              setPageXY(child, point.x, point.y + this.offsetHeight);
              child.style.visibility = 'visible';
            }
          }
          return false;
        };
        parent.onmouseout = function (e)
        {
          var relatedTarget = null;
          if (e)
          {
            relatedTarget = e.relatedTarget;
            // work around Gecko Linux only bug where related target is null
            // when clicking on menu links or when right clicking and moving
            // into a context menu.
	    if (navigator.product == 'Gecko' && navigator.platform.indexOf('Linux') != -1 && !relatedTarget)
	    {
	      relatedTarget = e.originalTarget;
	    }
          }
          else if (window.event)
          {
            relatedTarget = window.event.toElement;
          }

          if (elementContains(this, relatedTarget))
          {
            return false;
          } 
          
          
          // hide the highlight menu
          hideM();

          var i;
          var child;
          for (i = 0; i < this.childNodes.length; i++)
          {
            child = this.childNodes[i];
            if (child.nodeName == 'UL')
            {
                child.style.visibility = 'hidden';
            }
          }
          return false;
        };
      }
    }
  }
  return true;
}

/* NDE dhtml.js tools */

function elementContains(elmOuter, elmInner)
{
  while (elmInner && elmInner != elmOuter)
  {
    elmInner = elmInner.parentNode;
  }
  if (elmInner == elmOuter)
  {
    return true;
  }
  return false;
}

function getPageXY(elm)
{
  var point = { x: 0, y: 0 };
  while (elm)
  {
    point.x += elm.offsetLeft;
    point.y += elm.offsetTop;
    elm = elm.offsetParent;
  }
  return point;
}

function setPageXY(elm, x, y)
{
  var parentXY = {x: 0, y: 0 };

  if (elm.offsetParent)
  {
    parentXY = getPageXY(elm.offsetParent);
  }

  elm.style.left = (x - parentXY.x) + 'px';
  elm.style.top  = (y - parentXY.y) + 'px';
}
