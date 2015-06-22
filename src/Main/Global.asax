<%@ Application Language="C#" %>
<%@ Import Namespace="System.Security.Principal"  %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Diagnostics" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Threading" %>

<%@ Import Namespace="USC.GISResearchLab.Common.Utils.Files"  %>
<%@ Import Namespace="USC.GISResearchLab.Common.Utils.Numbers"  %>
<%@ Import Namespace="USC.GISResearchLab.Common.Utils.Web.Cookies"  %>
<%@ Import Namespace="USC.GISResearchLab.Common.Core.Databases"  %>

<%@ Import Namespace="USC.GISResearchLab.Common.Core.Utils.Web.Authentication.Forms"  %>
<%@ Import Namespace="USC.GISResearchLab.Common.Diagnostics.TraceListeners" %>
<%@ Import Namespace="USC.GISResearchLab.Websites.WebGIS.ApplicationStates" %>
<%@ Import Namespace="USC.GISResearchLab.Common.Web.StateManagement.ServiceTransactionManagement.AbstractClasses" %>
<%@ Import Namespace="USC.GISResearchLab.Common.Utils.Strings" %>


<script runat="server">

    #region Properties
    public ApplicationState ApplicationState
    {
        get
        {
            ApplicationState ret = null;

            try
            {
                ret = (ApplicationState)Application["ApplicationState"] as ApplicationState;
            }
            catch (Exception e)
            {
                throw new Exception("Error in ApplicationState_get - global.asax", e);
            }
            return ret;
        }
    }

  
    
    public bool UseStaticPagesOnly 
    {
        get { return false; }
    }

    
    #endregion


    void Application_Start(object sender, EventArgs e) 
    {
        Application.Clear();
    }

    void InitializeApplicationState()
    {
        try
        {

            if (!UseStaticPagesOnly)
            {
                if (ApplicationState == null)
                {
                    string pathstring = Context.Request.FilePath.ToString();
                    string applicationPath = HttpRuntime.AppDomainAppPath;
                    //string drive = FileUtils.GetDrive(HttpRuntime.AppDomainAppPath);
                    //string databaseDirectory = drive + @"GeocodingCorrectionDatabases\";

                    string databaseDirectory = ConfigurationManager.AppSettings["DatabaseDirectory"];

                    if (!String.IsNullOrEmpty(databaseDirectory))
                    {
                        if (!Directory.Exists(databaseDirectory))
                        {
                            databaseDirectory = Directory.GetParent(applicationPath).Parent.Parent.FullName + @"\WebData\WebGISDatabases\";
                        }
                        else
                        {
                            if (!databaseDirectory.EndsWith("\\"))
                            {
                                databaseDirectory = databaseDirectory + "\\";
                            }
                        }
                    }
                    else
                    {
                        databaseDirectory = Directory.GetParent(applicationPath).Parent.Parent.FullName + @"\WebData\WebGISDatabases\";
                    }

                    if (!Directory.Exists(databaseDirectory))
                    {
                        Directory.CreateDirectory(databaseDirectory);
                    }

                    string databaseUploadPath = databaseDirectory;

                    string logFilePath = Path.Combine(databaseDirectory, "traceLog.txt");
                    string errorRequestPath = Path.Combine(databaseDirectory, "ErrorRequests\\");

                    if (!Directory.Exists(errorRequestPath))
                    {
                        Directory.CreateDirectory(errorRequestPath);
                    }

                    string binDiretoryPath = Path.Combine(applicationPath, "bin");
                    
                    ApplicationState newApplicationState = new ApplicationState();
                    newApplicationState.LogFilePath = logFilePath;
                    newApplicationState.BinDirectoryPath = binDiretoryPath;
                    newApplicationState.ErrorRequestPath = errorRequestPath;
                    newApplicationState.SetupTracing(3, logFilePath);

                    //ApplicationState.ShouldDisplayErrors = true;
                    newApplicationState.ShouldDisplayErrors = false;

                    
                    newApplicationState.MaxNumberOfConcurrentProcesses = 3;
                    string maxNumberOfConcurrentProcesses = ConfigurationManager.AppSettings["maxNumberOfConcurrentProcesses"];
                    if (!String.IsNullOrEmpty(maxNumberOfConcurrentProcesses))
                    {
                        if (StringUtils.IsDouble(maxNumberOfConcurrentProcesses))
                        {
                            newApplicationState.MaxNumberOfConcurrentProcesses = Convert.ToInt32(maxNumberOfConcurrentProcesses);
                        }
                    }

                   

                    newApplicationState.ProductionHostName = ConfigurationManager.AppSettings["ProductionHostName"];
                    newApplicationState.DevelopmentHostName = ConfigurationManager.AppSettings["DevelopmentHostName"];
                    newApplicationState.MaxNumberOfErrorsToReport = int.Parse(ConfigurationManager.AppSettings["MaxNumberOfErrorsToReport"]);


                    newApplicationState.EmailServer = ConfigurationManager.AppSettings["EmailServer"];
                    newApplicationState.EmailServerUserName = ConfigurationManager.AppSettings["EmailServerUserName"];
                    newApplicationState.EmailServerPassword = ConfigurationManager.AppSettings["EmailServerPassword"];

                    newApplicationState.EmailReplyTo = ConfigurationManager.AppSettings["EmailReplyTo"];
                    newApplicationState.EmailBugReportTo = ConfigurationManager.AppSettings["EmailBugReportTo"];
                    newApplicationState.EmailContactTo = ConfigurationManager.AppSettings["EmailContactTo"];
                    newApplicationState.EmailErrorTo = ConfigurationManager.AppSettings["EmailErrorTo"];
                    newApplicationState.EmailHelpRequestTo = ConfigurationManager.AppSettings["EmailHelpRequestTo"];
                    newApplicationState.EmailRegistrationTo = ConfigurationManager.AppSettings["EmailRegistrationTo"];
                    newApplicationState.EmailPartnerRequestTo = ConfigurationManager.AppSettings["EmailPartnerRequestTo"];

                    string emailBugReportCCListTo = ConfigurationManager.AppSettings["EmailBugReportCCListTo"];
                    string emailContactCCListTo = ConfigurationManager.AppSettings["EmailContactCCListTo"];
                    string emailErrorCCListTo = ConfigurationManager.AppSettings["EmailErrorCCListTo"];
                    string emailHelpRequestCCListTo = ConfigurationManager.AppSettings["EmailHelpRequestCCListTo"];
                    string emailRegistrationCCListTo = ConfigurationManager.AppSettings["EmailRegistrationCCListTo"];
                    string emailPartnerRequestCCListTo = ConfigurationManager.AppSettings["EmailPartnerRequestCCListTo"];
                    
                    if (!String.IsNullOrEmpty(emailBugReportCCListTo))
                    {
                        newApplicationState.EmailBugReportCCListTo = emailBugReportCCListTo.Split(',');
                    }

                    if (!String.IsNullOrEmpty(emailContactCCListTo))
                    {
                        newApplicationState.EmailContactCCListTo = emailContactCCListTo.Split(',');
                    }

                    if (!String.IsNullOrEmpty(emailErrorCCListTo))
                    {
                        newApplicationState.EmailErrorCCListTo = emailErrorCCListTo.Split(',');
                    }

                    if (!String.IsNullOrEmpty(emailHelpRequestCCListTo))
                    {
                        newApplicationState.EmailHelpRequestCCListTo = emailHelpRequestCCListTo.Split(',');
                    }

                    if (!String.IsNullOrEmpty(emailRegistrationCCListTo))
                    {
                        newApplicationState.EmailRegistrationCCListTo = emailRegistrationCCListTo.Split(',');
                    }

                    if (!String.IsNullOrEmpty(emailPartnerRequestCCListTo))
                    {
                        newApplicationState.EmailPartnerRequestCCListTo = emailPartnerRequestCCListTo.Split(',');
                    }

                    Application.Add("ApplicationState", newApplicationState);
                }
            }
        }
        catch (Exception ex)
        {
            string msg = "Error InitialApplicationState: " + ex.Message;
            throw new Exception(msg, ex);
        }
    }

    void InitializeSessionState()
    {
        try
        {
            if (!UseStaticPagesOnly)
            {
                if (ApplicationState == null)
                {
                    InitializeApplicationState();
                }
                
            }
        }
        catch (Exception ex)
        {
            string msg = "Error InitializeSessionState: " + ex.Message;
            throw new Exception(msg, ex);
        }
    }

    void Application_BeginRequest(object sender, EventArgs e)
    {
        try
        {

            string strHostName = Request.Url.Host;
            string strURL = Request.RawUrl.ToLower();




            if (!UseStaticPagesOnly)
            {

                bool shouldInit = false;

                if (strURL.ToLower().Contains(".aspx"))
                {
                    string initParam = Request["init"];
                    if (!String.IsNullOrEmpty(initParam))
                    {
                        if (StringUtils.IsBoolean(initParam))
                        {
                            shouldInit = Convert.ToBoolean(initParam);
                        }
                    }
                }

                if (ApplicationState == null || shouldInit)
                {
                    InitializeApplicationState();
                }

                if (ApplicationState != null)
                {

                    if (!ApplicationState.IsInitialized || shouldInit)
                    {

                        if (String.IsNullOrEmpty(ApplicationState.HostName) || String.IsNullOrEmpty(ApplicationState.ApplicationConnectionString) || ((ApplicationState)ApplicationState).ApplicationDatabaseType == DatabaseType.Unknown)
                        {
                            ((ApplicationState)ApplicationState).HostName = strHostName;
                            ((ApplicationState)ApplicationState).Protocol = Request.Url.Scheme.ToString();

                            if (!ApplicationState.Protocol.EndsWith("://") && !ApplicationState.HostName.StartsWith("://"))
                            {
                                ((ApplicationState)ApplicationState).Protocol += "://";
                            }

                            ((ApplicationState)ApplicationState).WebsiteTitle = "Texas A&M Geoservices";

                            if (String.Compare(ApplicationState.HostName, "localhost", true) == 0)
                            {
                                ((ApplicationState)ApplicationState).ShouldSendErrorEmails = false;

                                ((ApplicationState)ApplicationState).SiteConnectionString = ConfigurationManager.ConnectionStrings["SiteConnectionString"].ConnectionString;

                            }
                            else if (String.Compare(ApplicationState.HostName, "healthgis.tamu.edu", true) == 0)
                            {
                                ((ApplicationState)ApplicationState).ShouldSendErrorEmails = true;
                                ((ApplicationState)ApplicationState).SiteConnectionString = ConfigurationManager.ConnectionStrings["SiteConnectionString"].ConnectionString;


                            }






                            ((ApplicationState)ApplicationState).EmailConnectionString = ConfigurationManager.ConnectionStrings["EmailConnectionString"].ConnectionString;

                            ((ApplicationState)ApplicationState).InitializeConnections(DataProviderType.SqlServer, DatabaseType.SqlServer, ((ApplicationState)ApplicationState).SiteConnectionString);


                            ((ApplicationState)ApplicationState).InitializeManagers();

                        }
                    }
                }
            }




        }
        catch (Exception ex)
        {
            string msg = "Error Application_BeginRequest: " + ex.Message;
            throw new Exception(msg, ex);
        }
    }
    
    void Application_End(object sender, EventArgs e) 
    {
    }

    void Application_Error(object sender, EventArgs e)
    {
        string strHostName = Request.Url.Host;
        string strURL = Request.RawUrl.ToLower();
        string strUserIpAddress = Request.UserHostAddress;
        
        HttpContext context = HttpContext.Current;

        if (!UseStaticPagesOnly)
        {

            if (ApplicationState != null)
            {
                Exception exception = Server.GetLastError().GetBaseException();
                bool isMissingPage = false;
                if (exception.GetType() == typeof(HttpException))
                {
                    if (((HttpException)exception).GetHttpCode() == 404)
                    {
                        isMissingPage = true;
                    }
                }

                if (!isMissingPage)
                {
                    string redirectUrl = "";

                    if (exception.GetType() == typeof(ArgumentException))
                    {

                        if (strURL.Contains("geocodesinglenonparsed.aspx"))
                        {
                            redirectUrl = "/Support/ServerError.aspx?error=A problem occurred with your request, most likely an attempt to call service from script. Please use the API's at: http://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebService.aspx";
                        }

                    }
                    else if (exception.GetType() == typeof(HttpException))
                    {
                        if (strURL.Contains("contact.aspx") || strURL.Contains("contactus.aspx"))
                        {
                            //((ApplicationState)ApplicationState).SecurityManager.InsertBannedIPAddress(-1, strUserIpAddress, "contact form spamming");
                        }
                        else
                        {
                            //redirectUrl = ((ApplicationState)ApplicationState).HandleException(UserId, UserName, "Global.asax", null, exception, context.Request, context.Response, true);
                        }
                    }
                    else
                    {
                       // redirectUrl = ((ApplicationState)ApplicationState).HandleException(UserId, UserName, "Global.asax", null, exception, context.Request, context.Response, true);
                    }

                    if (!String.IsNullOrEmpty(redirectUrl))
                    {
                        redirectUrl = Request.Url.Scheme + "://" + Request.Url.Host + redirectUrl;
                        HttpContext.Current.Response.Redirect(redirectUrl, false);
                    }
                }
                else
                {


                    string redirectUrl = Request.Url.Scheme + "://" + Request.Url.Host + Request.ApplicationPath + "/Support/MissingPage.aspx?url=" + Request.Url;
                    HttpContext.Current.Response.Redirect(redirectUrl, false);
                }
            }
        }
        Server.ClearError();
    }

    void Session_Start(object sender, EventArgs e) 
    {
        try
        {
            if (!UseStaticPagesOnly)
            {

                bool isTimeout = false;
                string oldSessionId = "";


                // check if this is a timeout
                if (Session.IsNewSession)
                {
                    if (Request.Cookies["ASP.NET_SessionId"] != null &&
                        Request.Cookies["ASP.NET_SessionId"].Value != null &&
                        Request.Cookies["ASP.NET_SessionId"].Value != "")
                    {
                        isTimeout = true;
                        oldSessionId = Request.Cookies["ASP.NET_SessionId"].Value;

                    }
                }

                Session.Add("SessionTimeStart", DateTime.Now.ToString());
            }

        }
        catch (Exception ex)
        {
            string msg = "Error Session_Start: " + ex.Message;
            throw new Exception(msg, ex);
        }
    }

    void Session_End(object sender, EventArgs e) 
    {
        try
        {
            if (!UseStaticPagesOnly)
            {
                
            }
        }
        catch (Exception ex)
        {
            string msg = "Error Session_End: " + ex.Message;
            throw new Exception(msg, ex);
        }
    }

    protected void Application_AuthenticateRequest(Object sender, EventArgs e)
    {
        try
        {
            if (!UseStaticPagesOnly)
            {
                if (ApplicationState != null)
                {
                    //GenericPrincipal newPrincipal = FormsAuthenticationUtils.AuthenticateAndRenew(Request, Response, UserId, UserName);
                    //if (newPrincipal != null)
                    //{
                    //    Context.User = newPrincipal;
                    //    if (newPrincipal.IsInRole("manager"))
                    //    {
                    //        if (ApplicationState != null)
                    //        {
                    //            ((ApplicationState)ApplicationState).ShouldDisplayErrors = true;
                    //        }
                    //    }
                    //}
                    //else
                    //{
                    //    return;
                    //}
                }
                else
                {
                    return;
                }
            }
            else
            {
                return;
            }
        }
        catch (Exception ex)
        {
            string msg = "Error Application_AuthenticateRequest: " + ex.Message;
            throw new Exception(msg, ex);
        }
    }
       
</script>
