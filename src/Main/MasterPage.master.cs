using System;
using System.Web.Security;
using System.Security.Principal;
using System.Web.UI.WebControls;
using USC.GISResearchLab.Common.Utils.Web.UIs;
using USC.GISResearchLab.Common.Utils.Security.Principals;
using USC.GISResearchLab.Common.Utils.Web.Cookies;
using USC.GISResearchLab.Common.Utils.Web.ExceptionHandlers;
using System.Data;
using System.Diagnostics;
using System.Data.SqlClient;
using USC.GISResearchLab.Websites.WebGIS.ApplicationStates;
using System.Web.UI;
using USC.GISResearchLab.Common.Web.StatefulPageManagement.StatefulMasterPages.AbstractClasses;
using USC.GISResearchLab.Common.Web.WebApplicationStates.Interfaces;

namespace USC.GISResearchLab.Websites.WebGIS
{
    public partial class MasterPageCorrection : AbstractUserManagableStatefulMasterPage
    {
        #region Properties
        ApplicationState ApplicationState
        {
            get
            {
                return (ApplicationState)Application["ApplicationState"];
            }
        }


        #endregion


        protected void Page_Load(object sender, EventArgs e)
        {

            if (String.IsNullOrEmpty(ApplicationState.BaseRequestPath))
            {
                ((ApplicationState)ApplicationState).BaseRequestPath = ResolveUrl("~/");
            }

            try
            {
                if (!IsPostBack)
                {
                    
                }

               
            }
            catch (Exception ex)
            {
                if (ApplicationState != null)
                {
                    ((ApplicationState)ApplicationState).HandleException("MasterPage", null, ex, this.Context.Request, this.Context.Response);
                }
                else
                {
                    Response.Write("An exception occured but the applicaiton state has not been initialized and can't process the exception: <br>" + ex.Message);
                }
            }
        }


    }
}
