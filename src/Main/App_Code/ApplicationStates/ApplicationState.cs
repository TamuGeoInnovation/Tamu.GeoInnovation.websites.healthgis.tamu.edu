using System;
using System.Diagnostics;
using System.Web;
using System.Web.UI;

using USC.GISResearchLab.Common.Core.Databases;
using USC.GISResearchLab.Common.Databases.QueryManagers;
using USC.GISResearchLab.Common.Diagnostics.TraceListeners;


using System.Collections.Generic;
using USC.GISResearchLab.Common.Databases.ConnectionStringManagers;
using USC.GISResearchLab.Common.Web.ApplicationStates.AbstractClasses;
using USC.GISResearchLab.Common.Web.StateManagement.UserManagement.Implementations;
using USC.GISResearchLab.Common.Web.WebApplicationStates.AbstractClasses;
using USC.GISResearchLab.Common.Web.StateManagement.RoleManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.ErrorManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.EmailManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.PaymentManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.StatisticsManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.NewsManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.ServiceTransactionManagement.AbstractClasses;
using USC.GISResearchLab.Common.Web.StateManagement.SessionManagement.Implementations;
using USC.GISResearchLab.Common.Web.StateManagement.SecurityManagement.Implementations;


namespace USC.GISResearchLab.Websites.WebGIS.ApplicationStates
{
    /// <summary>
    /// Summary description for ApplicationState
    /// </summary>
    public class ApplicationState : AbstractWebApplicationState, ICloneable
    {

        #region Properties



        #region Service Usage Settings

        #endregion

        #region Application Manager Properties

       

        // site specific instances of abstract managers


        // site-only managers

        #endregion

        #region Server Settings properties


        public TransactionLoggingMethod TransactionLoggingMethod { get; set; }


        #endregion


        //public SessionState SessionState { get; set; }

        #endregion

        public static TraceSource TraceSource = new TraceSource("HealthGIS");

        public ApplicationState()
        {
            ProductionHostName = "healthgis.tamu.edu";

            MaxNumberOfErrorsToReport = 15;
            MaxNumberOfConcurrentProcesses = 3;


            TransactionLoggingMethod = TransactionLoggingMethod.Database;


        }

        public void InitializeManagers()
        {
            try
            {

                ;
                base.InitializeManagers();


                // site-specific instances of abstract managers
              


                // site-only managers

                ShouldDisplayErrors = false;



                IsInitialized = true;

                EmailManager.ClosingText = "";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "As always, thank you for your interest in our services and let us know if you have any problems or need any help.";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Regards,";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "The Texas A&M Geo Team";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Department of Geography";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "College of Geosciences";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Texas A&M University";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Eller O&M Building, Room 810";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "TAMU Mail Stop 3147";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "College Station, Texas 77843-3147";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Phone: (979) 862-3551";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Fax: (979) 862-4487 ";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "Visit us on Facebook - http://www.facebook.com/TAMUGeoServices";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine + Environment.NewLine + Environment.NewLine + Environment.NewLine;
                EmailManager.ClosingText += "This message has been sent to you because you indicated you would like receive messages from the TAMU Geoprocessing site. If you would like to unsubscribe from future mailings, please log into your account and change your email preferences at http://geoservices.tamu.edu/UserServices/Profile/ChangeEmailPrefs.aspx.";
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += Environment.NewLine;
                EmailManager.ClosingText += "If you feel you have received this message in error or did not sign up to receive these notifications, please send an email to geoservices@geog.tamu.edu and we will remove your email address.";

            }
            catch (Exception e)
            {
                throw new Exception("Error in InitializeManagers: " + e.Message, e);
            }
        }

        public void ClearCaches()
        {

            base.ClearCaches();

          
        }

        


        #region ICloneable Members

        public object Clone()
        {
            ApplicationState ret = this.MemberwiseClone() as ApplicationState;

            // managers that should be handled in the base class

            ret.EmailManager = new WebEmailManager(ret);


            // site-specific instances of abstract managers

            // site-only managers


            ret.ShouldDisplayErrors = false;

            ret.ErrorManager.ErrorTableName = "PageErrors";
            return ret;
        }

        #endregion
    }
}