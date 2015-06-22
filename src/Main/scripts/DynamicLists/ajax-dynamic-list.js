	var ajaxBox_offsetX = 0;
	var ajaxBox_offsetY = 0;
	//var minimumLettersBeforeLookup = 2;	// Number of letters entered before a lookup is performed.
	
	var list_objects = new Array();
	var list_activeInput = false;
	var list_activeItem;
	var list_optionDivFirstItem = false;
	var list_currentLetters = new Array();
	var optionDiv = false;
	var optionDiv_iframe = false;

	var list_MSIE = false;
	if(navigator.userAgent.indexOf('MSIE')>=0 && navigator.userAgent.indexOf('Opera')<0)
	    list_MSIE=true;
	
	function getTopPos(inputObj)
	{
		
	  var returnValue = inputObj.offsetTop;
	  while((inputObj = inputObj.offsetParent) != null)
	  {
	  	returnValue += inputObj.offsetTop;
	  }
	  return returnValue;
	}
	
	function list_cancelEvent()
	{
		return false;
	}
	
	function getLeftPos(inputObj)
	{
	  var returnValue = inputObj.offsetLeft;
	  while((inputObj = inputObj.offsetParent) != null)
	    returnValue += inputObj.offsetLeft;
	  
	  return returnValue;
	}
	
	function option_setValue(e,inputObj)
	{
		if(!inputObj)
		    inputObj=this;
		    
		var tmpValue = inputObj.innerHTML;
		
		if(list_MSIE)
		    tmpValue = inputObj.innerText;
		else 
		    tmpValue = inputObj.textContent;
		
		if(!tmpValue)
		    tmpValue = inputObj.innerHTML;
		
		list_activeInput.value = tmpValue;
		
		if(document.getElementById(list_activeInput.name + '_hidden'))
		    document.getElementById(list_activeInput.name + '_hidden').value = inputObj.id; 
		   
		options_hide();
	}
	
	function options_hide()
	{
		if(!optionDiv)
		    return;
		    
		optionDiv.style.display='none';	
		
		if(optionDiv_iframe)
		    optionDiv_iframe.style.display='none';
	}

	function options_rollOverActiveItem(item,fromKeyBoard)
	{
		if(list_activeItem)
		    list_activeItem.className='optionDiv';
		    
		item.className='optionDivSelected';
		list_activeItem = item;
		
		if(fromKeyBoard)
		{
			if(list_activeItem.offsetTop>optionDiv.offsetHeight)
			{
				optionDiv.scrollTop = list_activeItem.offsetTop - optionDiv.offsetHeight + list_activeItem.offsetHeight + 2 ;
			}
			
			if(list_activeItem.offsetTop<optionDiv.scrollTop)
			{
				optionDiv.scrollTop = 0;	
			}
		}
	}
	
	function buildList(values)
	{
		
		optionDiv.innerHTML = '';
		list_activeItem = false;
		
		if (!values)
		{
		    options_hide();
			return;			
		}
		
		if(values.length<1)
		{
			options_hide();
			return;			
		}
		
		list_optionDivFirstItem = false;
		var optionsAdded = false;
		
		for(var no=0;no<values.length;no++)
		{
			if(values[no].length==0)
			    continue;
			    
			optionsAdded = true;
			var div = document.createElement('DIV');
			
			var items = values[no].split(/###/gi);
			
			if(values==1 && list_activeInput.value == items[0])
			{
				options_hide();
				return;						
			}
			
			
			div.innerHTML = items[items.length-1];
			div.id = items[0];
			div.className='optionDiv';
			div.onmouseover = function(){ options_rollOverActiveItem(this,false); }
			
			div.onclick = option_setValue;
			if(!list_optionDivFirstItem)
			    list_optionDivFirstItem = div;
			    
			optionDiv.appendChild(div);
		}	
		
		if(optionsAdded)
		{
			optionDiv.style.display='block';
			
			if(optionDiv_iframe)
			    optionDiv_iframe.style.display='';
		}
					
	}
	
	
	function option_resize(inputObj)
	{
		optionDiv.style.top = (getTopPos(inputObj) + inputObj.offsetHeight + ajaxBox_offsetY) + 'px';
		optionDiv.style.left = (getLeftPos(inputObj) + ajaxBox_offsetX) + 'px';
		
		if(optionDiv_iframe)
		{
			optionDiv_iframe.style.left = optionDiv.style.left;
			optionDiv_iframe.style.top = optionDiv.style.top;			
		}		
		
	}
	
	function showOptions(inputObj,paramToExternalFile,minimumLettersBeforeLookup,e)
	{
	    queryUrl = queryUrlItem.value;
	    
		if(e.keyCode==13 || e.keyCode==9)
		    return;
		    
		if(list_currentLetters[inputObj.name]==inputObj.value)
		    return;
		    
		list_currentLetters[inputObj.name] = inputObj.value;
		
		if(!optionDiv)
		{
			optionDiv = document.createElement('DIV');
			optionDiv.id = 'listOfOptions';
			$('contentBody').appendChild(optionDiv);
			
			if(list_MSIE)
			{
				optionDiv_iframe = document.createElement('IFRAME');
				optionDiv_iframe.border='0';
				optionDiv_iframe.style.width = optionDiv.clientWidth + 'px';
				optionDiv_iframe.style.height = optionDiv.clientHeight + 'px';
				optionDiv_iframe.id = 'listOfOptions_iframe';
				
				document.body.appendChild(optionDiv_iframe);
			}
			
			var allInputs = document.getElementsByTagName('INPUT');
			for(var no=0;no<allInputs.length;no++)
			{
				if(!allInputs[no].onkeyup)
				    allInputs[no].onfocus = options_hide;
			}	
					
			var allSelects = document.getElementsByTagName('SELECT');
			for(var no=0;no<allSelects.length;no++)
			{
				allSelects[no].onfocus = options_hide;
			}

			var oldonkeydown=document.body.onkeydown;
			if(typeof oldonkeydown!='function')
			{
				document.body.onkeydown=option_keyNavigation;
			}
			else
			{
				document.body.onkeydown=function()
				{
					oldonkeydown();
				    option_keyNavigation();
				};
			}
			var oldonresize=document.body.onresize;
			
			if(typeof oldonresize!='function')
			{
				document.body.onresize=function() 
				{   
				    option_resize(inputObj); 
				};
				
			}
			else
			{
				document.body.onresize=function()
				{   oldonresize();
				    option_resize(inputObj) ;
				};
			}
				
		}
		
		if(inputObj.value.length<minimumLettersBeforeLookup)
		{
			options_hide();
			return;
		}
				

		optionDiv.style.top = (getTopPos(inputObj) + inputObj.offsetHeight + ajaxBox_offsetY) + 'px';
		optionDiv.style.left = (getLeftPos(inputObj) + ajaxBox_offsetX) + 'px';
		
		if(optionDiv_iframe)
		{
			optionDiv_iframe.style.left = optionDiv.style.left;
			optionDiv_iframe.style.top = optionDiv.style.top;			
		}
		
		list_activeInput = inputObj;
		optionDiv.onselectstart =  list_cancelEvent;
		

		optionDiv.innerHTML = '';
		
		var objnumber= $('number').getValue();
		var objpre= $('pre').getValue();
        var objname= $('name').getValue();
        var objtype= $('type').getValue();
        var objpost= $('post').getValue();
        var objcity= $('city').getValue(); 
        var objstate= $('state').getValue();
        var objzip = $('zip').getValue();
        var objSessionId = $('ctl00_ctl00_ctl00_ctl00_ContentPlaceHolder1_ContentArea_ContentArea_ContentArea_hiddenSessionId').getValue();
 
        if (inputObj.id == 'number')
        {        
            queryUrl += 'GetStreetNumbers';
        }
        else if (inputObj.id == 'pre') {
            queryUrl += 'GetStreetPreDirectionals';
        }
        else if (inputObj.id == 'name')
        {        
            queryUrl += 'GetStreetNames';
        }
        else if (inputObj.id == 'type') {
            queryUrl += 'GetStreetSuffixes';
        }
        else if (inputObj.id == 'post') {
            queryUrl += 'GetStreetPostDirectionals';
        }
        else if (inputObj.id == 'city')
        {        
            queryUrl += 'GetCityNames';
        }
        else if (inputObj.id == 'state')
        {        
            queryUrl += 'GetStateNames';
        }
        else if (inputObj.id == 'zip')
        {        
            queryUrl += 'GetZips';
        }
 
        new Ajax.Request(queryUrl , 
        {
            method: 'get',
            parameters: {
                number: objnumber,
                name: objname,
                city: objcity,
                state: objstate,
                zip: objzip,
                sessionId: objSessionId
                },
            onComplete: function(transport)
            {
            },
            onSuccess: function(transport)
            {
                var response = transport.responseText || "no response text";
                
                 var ajaxResponse = Try.these(
                                            function() { return new DOMParser().parseFromString(response, 'text/xml'); },
                                            function() { var xmldom = new ActiveXObject('Microsoft.XMLDOM'); xmldom.loadXML(response); return xmldom; }
                                            );
            
                //option_list_showContent(ajaxIndex,inputObj,paramToExternalFile);
                var content = getXMLValue(ajaxResponse, 'string');
                
                
                var elements = content.split('|');
                if (elements.length == 1 && elements[0]=='')
                {
                    elements[0]='No Matches ...';
                }
                else if (elements.length > 99)
                {
                    elements.unshift("First 100 Matches...");
                }
                
                buildList(elements);

            },
            onFailure: function(transport)
            { 
                alert('Something went wrong...' + transport.status + ' -- ' + transport.statusText + ' -- ' + transport.responseText);
            }
        });
            

		
			
	}
	
	function option_keyNavigation(e)
	{
		if(document.all)e = event;
		
		if(!optionDiv)return;
		if(optionDiv.style.display=='none')return;
		
		if(e.keyCode==38) // Up arrow
		{	
			if(!list_activeItem)
			    return;
			if(list_activeItem && !list_activeItem.previousSibling)
			    return;
			    
			options_rollOverActiveItem(list_activeItem.previousSibling,true);
		}
		
		if(e.keyCode==40) // Down arrow
		{	
			if(!list_activeItem)
			{
				options_rollOverActiveItem(list_optionDivFirstItem,true);
			}
			else
			{
				if(!list_activeItem.nextSibling)
				    return;
				    
				options_rollOverActiveItem(list_activeItem.nextSibling,true);
			}
		}
		
		if(e.keyCode==13 || e.keyCode==9) // Enter key or tab key
		{
			if(list_activeItem && list_activeItem.className=='optionDivSelected')
			    option_setValue(false,list_activeItem);
			    
			if(e.keyCode==13)
			    return false; 
			else 
			    return true;
		}
		if(e.keyCode==27) // Escape key
		{	
			options_hide();			
		}
	}
	
	
	document.documentElement.onclick = autoHideList;
	
	function autoHideList(e)
	{
		if(document.all)
		    e = event;
		
		if (e.target) 
		    source = e.target;
		    
		else if (e.srcElement) 
		    source = e.srcElement;
		
		if (source.nodeType == 3) // defeat Safari bug
				source = source.parentNode;		
				
		if(source.tagName.toLowerCase()!='input' && source.tagName.toLowerCase()!='textarea')
		    options_hide();
		
	}
	
	function getXMLValue(ajaxResponse, nodeName)
    {
        var val = "";
        var node = ajaxResponse.getElementsByTagName(nodeName)[0];
        if (node != null && node.firstChild != null){
            val = node.firstChild.nodeValue;
        }
        return val;
    }