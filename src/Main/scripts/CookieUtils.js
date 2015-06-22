function setCookie(name, value, expires, path, domain, secure) 
{
    var today = new Date();
    today.setTime(today.getTime());

    if (expires)
    {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expiresDate = new Date(today.getTime() + (expires));

    var text = "";
    text +=  name + "=" + escape(value);
    text +=  ((expires) ? ";expires=" + expiresDate.toGMTString() : "" );
    text +=  ((path) ? ";path=" + path : "" );
    text +=  ((domain) ? ";domain=" + domain : "" );
    text +=  ((secure) ? ";secure" : "" );

    document.cookie = text;
}

function getCookie(name) 
{
	
    var start = document.cookie.indexOf(name + "=" );
    var len = start + name.length + 1;
    
    if ((!start ) &&
        (name != document.cookie.substring( 0, name.length)))
    {
        return null;
    }
    if (start == -1){
        return null;
    }
    
    var end = document.cookie.indexOf(";", len);
    if (end == -1) 
    {
        end = document.cookie.length;
    }
    
    return unescape(document.cookie.substring(len, end));
}

function deleteCookie(name, path, domain)
{
    if (getCookie(name))
    {
        var text = "";
        text += name + "=";
        text += ((path) ? ";path=" + path : "");
        text += ((domain) ? ";domain=" + domain : "" );
        text += ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        
        document.cookie = text;
    }
}
	