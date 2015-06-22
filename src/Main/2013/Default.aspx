<%@ Page Language="C#" MasterPageFile="~/2013/Master_2013.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Services_Default" Title="Second International ACM SIGSPATIAL Workshop on HealthGIS (HealthGIS'13) - Objectives" %>

<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolderHead" Runat="Server">
    <meta name="description" content="Second International ACM SIGSPATIAL Workshop on HealthGIS (HealthGIS'13) Objectives"/>
    <meta name="keywords" content="ACM, Sigspatial, Health, HealthGIS, 2013"/>
</asp:Content>

<asp:Content ID="Content7" ContentPlaceHolderID="ContentAreaHeader" Runat="Server">    
    Second International ACM SIGSPATIAL Workshop on HealthGIS (HealthGIS'13)  - Objectives
</asp:Content>    
                        
<asp:Content ID="Content9" ContentPlaceHolderID="ContentArea" Runat="Server">
    
    
    <h3>Overview</h3>
    <p>
    Public health and public healthcare are important social issues with deep implications for government administrations and with large effect on individual standards of living. 
    In many countries, healthcare institutions are being pushed to their limit by an aging population and increased urbanization (which may lead to additional health issues such as pollution). 
    Many of these challenges have strong geospatial components. For example, GIS techniques may be used to determine spatial correlates of health. 
    In addition, the ability to detect and record the location history of individuals and groups using cellular phones coupled with the ability to analyze and visually 
    present large amounts of geospatial data can be harnessed to advance health-related applications. 
    Other notable examples include using geographic information systems and appropriate applications to assist the evacuation of injured people, 
    monitoring the spread of infectious diseases, collecting data for statistical analysis of the effect of pollution on public health, and providing 
    assistance to elderly people with orientation difficulties. These applications necessitate new techniques, systems, and algorithms for effectively utilizing 
    geospatial data in the context of public health.
    </p>
    <p>
    This workshop will provide a forum for researchers and practitioners to share new ideas and techniques for Health-related GIS applications. 
    We invite submission of original research related to all aspects of GIS usages and applications in medical and in healthcare systems. 
    We especially 
    encourage papers based on real-world experience.
    </p>

    <h3> Click on one of the links below for more information
    </h3>

     <ul id="Ul1" runat="server">
        <li id="Li1" runat="server">
            <a href="<%= ResolveUrl("~/") %>">
                Objectives
            </a>
        </li>
        <li id="Li2" runat="server">
            <a href="<%= ResolveUrl("~/Topics.aspx") %>">
                Topics
            </a>
        </li>
        <li id="Li3" runat="server">
            <a href="<%= ResolveUrl("~/Dates.aspx") %>">
                Important Dates
            </a>
        </li>
        <li id="Li4" runat="server">
            <a href="<%= ResolveUrl("~/AcceptedPapers.aspx") %>">
                Accepted Papers
            </a>
        </li>
        <li id="Li5" runat="server">
            <a href="<%= ResolveUrl("~/Program.aspx") %>">
                Program
            </a>
        </li>
        <li id="Li6" runat="server">
            <a href="<%= ResolveUrl("~/Submission.aspx") %>">
                Paper Submission
            </a>
        </li>
        <li id="Li7" runat="server">
            <a href="<%= ResolveUrl("~/Organization.aspx") %>">
                Organization
            </a>
        </li>
    </ul>
    
</asp:Content>

                                
