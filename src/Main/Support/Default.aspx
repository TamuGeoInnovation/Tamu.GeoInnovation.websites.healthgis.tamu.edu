<%@ Page Language="C#" MasterPageFile="~/Support/Master_Section_Support.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Support_Default" Title="Texas A&M Geoservices Support" %>

<asp:Content ID="Content10" ContentPlaceHolderID="ContentPlaceHolderHead" Runat="Server">
    <meta name="description" content="Support options for Texas A&M Geoservices"/>
    <meta name="keywords" content="support, contact, faq"/>
</asp:Content>
    
<asp:Content ID="Content8" ContentPlaceHolderID="ContentSectionNav" Runat="Server">
    <ul>
        <li>
            <a href="<%= ResolveUrl("~/Support/ContactUs.aspx") %>">
                Contact
            </a>
        </li>
        <li>
            <a href="<%= ResolveUrl("~/Support/Tutorials.aspx") %>">
                Tutorials
            </a>
        </li>
        <li>
            <a href="<%= ResolveUrl("~/Support/FAQ.aspx") %>">
                FAQ
            </a>
            <br />
            Frequently asked questions and answers
        </li>

        <li>
            <a href="<%= ResolveUrl("~/Support/ReportBug.aspx") %>">
                Bug Reporting
            </a>
            <br />
            Help us improve the Texas A&amp;M Geoservices
        </li>
        <li>
            <a href="http://search.tamu.edu/search">
                Search
            </a>
        </li>
    </ul>
</asp:Content>

<asp:Content ID="Content7" ContentPlaceHolderID="ContentAreaHeader" Runat="Server">    
    Texas A&amp;M Geoservices Support
</asp:Content>    
                        
<asp:Content ID="Content9" ContentPlaceHolderID="ContentArea" Runat="Server">
     
     <p>
        We look forward to feedback from users about how 
        the services are serving your needs. Please let us know
        if you encounter any bugs, have any comments or suggestions,
        or would like to share any success stories.
     </p>
                                            
    <dl>
        <dt>
            <a href="<%= ResolveUrl("~/Support/ContactUs.aspx") %>">
                Contact
            </a>
        </dt>
        <dd>
            Contact information for the Texas A&amp;M University Geoservices website
        </dd>
        <dt>
            <a href="<%= ResolveUrl("~/Support/Tutorials.aspx") %>">
                Video Tutorials
            </a>
        </dt>
        <dd>
            YouTube videos on how to work stuff inside of the Texas A&amp;M University Geoservices website
        </dd>
        <dt>
            <a href="<%= ResolveUrl("~/Support/FAQ.aspx") %>">
                FAQ
            </a>
        </dt>
        <dd>
            Frequently asked questions and answers
        </dd>
        <dt>
            <a href="<%= ResolveUrl("~/Support/ReportBug.aspx") %>">
                Bug Reporting
            </a>
        </dt>
        <dd>
            Help us improve the Texas A&amp;M Geoservices
        </dd>
        
    </dl>
</asp:Content>


		
                              
                                          