var timerID = 0;
var tStart  = null;

function GetNow()
{
    var d = new Date();

    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    
    var hourString = "" + hour;
    if (hourString.length <2)
    {
        hourString = "0" + hourString;
    }
    
    var minString = "" + min;
    if (minString.length <2)
    {
        minString = "0" + minString;
    }
    
    var secString = "" + sec;
    if (secString.length <2)
    {
        secString = "0" + secString;
    }
    

    var ret = month + "/" + day + "/" + year + " " + hourString + ":" + minString + ":" + secString

    return ret;
    
}

function GetTimerValue()
{
    if(timerID) 
    {
        clearTimeout(timerID);
        clockID  = 0;
    }

    if(!tStart)
    {
        tStart = new Date();
    }

    var tDate = new Date();
    var tDiffMilliSeconds = tDate.getTime() - tStart.getTime();
    var tDiffSeconds = 0;
    if (tDiffMilliSeconds > 0)
    {
        tDiffSeconds = Math.round(tDiffMilliSeconds / 1000);
    }
    
    
    var diff = "" + tDiffSeconds
    return diff;
}

function UpdateTimer() 
{
   document.getElementById("theTimer").innerHTML = GetTimerValue();
   timerID = setTimeout("UpdateTimer()", 1000);
}

function StartTimer() 
{
   tStart = new Date();

   document.getElementById("theTimer").innerHTML = "0";

   timerID = setTimeout("UpdateTimer()", 1000);
}

function StopTimer() 
{
   if(timerID) 
   {
      clearTimeout(timerID);
      timerID  = 0;
   }
   tStart = null;
}

function ResetTimer() 
{
    tStart = null;
    document.getElementById("theTimer").innerHTML = "0";
}

