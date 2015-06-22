function TrimLength(inString, len)
{
    if (inString.length>len)
    {
        inString = inString.substring(0, len);
        inString += '...';
    }
    return inString;
}

function ReplaceAll(inString, charToReplace, charToReplaceWith)
{
    if (inString)
    {
        while(inString.indexOf(charToReplace) > 0)
        {
            inString = inString.replace(charToReplace, charToReplaceWith);
        }
    }
    return inString;
}


function trim(str) 
{
    if (str)
    {
        str = str.replace(/^[ ]+(.*)$/, '$1'); // Trims leading spaces
        str = str.replace(/^(.*)[ ]+$/, '$1'); // Trims trailing spaces
    }
    return str;
}

function fileExt(path) 
{
    return path.substr(path.lastIndexOf('.') + 1);
}