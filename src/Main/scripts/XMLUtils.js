function getXMLValue(xmlDoc, nodeName)
{
    var val = "";
    var node = xmlDoc.getElementsByTagName(nodeName)[0];
    if (node != null && node.firstChild != null){
        val = node.firstChild.nodeValue;
    }
    return val;
}

function escapeXML(xmlDocString)  
{  
    ret = xmlDocString + "";
    ret = ret.replace(AMP,"&amp;");
    ret = ret.replace(TAB, "    ");
    ret = ret.replace(LT, "&lt;");
    ret = ret.replace(GT, "&gt;");  
    
    return ret;
} 

function escapeXMLChar(xmlDocString, c)  
{  
    ret = "";
    if (c == '&')
    {
        ret = xmlDocString.replace(AMP,"&amp;");  
    }
    if (c == '<')
    {
        ret = xmlDocString.replace(LT, "&lt;");  
    }
    if (c == '>')
    {
        ret = xmlDocString.replace(GT, "&gt;");  
    }
    if (c == '\t')
    {
        ret = xmlDocString.replace(TAB, "    ");  
    }
    return ret;
}

function getXMLDoc(xmlString)
{
    var xmlDoc = Try.these(
        function() { 
            return new DOMParser().parseFromString(xmlString, 'text/xml'); 
            },
        function() { 
            var xmldom = new ActiveXObject('Microsoft.XMLDOM'); 
            xmldom.loadXML(xmlString); 
            return xmldom; 
        }
    );
    
    return xmlDoc;
}

function getXMLNode(xmlDoc, nodeName)
{
    var ret = "";
    if (xmlDoc)
    {
        ret = xmlDoc.getElementsByTagName(nodeName)[0];
    }
    return ret;
}

function getStringFromXMLNode(xmlNode)
{
    var ret = "";
    if (xmlNode)
    {
        ret = (new XMLSerializer()).serializeToString(xmlNode);
    }
    return ret;
}

function getXMLNodeAttribute(xmlNode, attributeName)
{
    var ret = "";
    if (xmlNode)
    {
        ret = xmlNode.getAttribute(attributeName);
    }
    return ret;
}

function setXMLNodeAttribute(xmlNode, attributeName, attributeValue)
{
    if (xmlNode)
    {
        ret = xmlNode.setAttribute(attributeName, attributeValue);
    }
}