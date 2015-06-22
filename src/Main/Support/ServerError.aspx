<%@ Page Language="C#" MasterPageFile="~/Support/Master_Section_Support.master" ValidateRequest="false" AutoEventWireup="true" CodeFile="ServerError.aspx.cs" Inherits="Support_ServerError" Title="Server Error" %>


<asp:Content ID="Content10" ContentPlaceHolderID="ContentPlaceHolderHead" Runat="Server">
    <meta name="description" content="A server error was encountered"/>
</asp:Content>
    
<asp:Content ID="Content8" ContentPlaceHolderID="ContentSectionNav" Runat="Server">
    <ul>
        
        <li id="here">
            <a href="">
                Server Error
            </a>
        </li>
    </ul>
</asp:Content>

<asp:Content ID="Content7" ContentPlaceHolderID="ContentAreaHeader" Runat="Server">    
         Server Error
</asp:Content>    
                        
<asp:Content ID="Content9" ContentPlaceHolderID="ContentArea" Runat="Server">
     
    <h3>This error has been logged and the administrator has been notified.</h3>

    <br />
    <table cellspacing="0" cellpadding="3" rules="all" border="1" style="border-color:Gray;border-width:1px;border-style:None;width:100%;border-collapse:collapse;">
        <tr>
            <td>
                Error Details
            </td>
        </tr>
        <tr>
            <td>
              <asp:Label runat="server" ID="txtErrorDate"></asp:Label>
            </td>
        </tr>
        <tr>
            <td>
               <asp:Label runat="server" ID="txtErrorIP"></asp:Label>
            </td>
        </tr>
        <tr>
            <td>
               <asp:Label runat="server" ID="txtErrorMessage"></asp:Label>
            </td>
        </tr>
    </table>
                                            
</asp:Content>




							       
							   
							   
							    