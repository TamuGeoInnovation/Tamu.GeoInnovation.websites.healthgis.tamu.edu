using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using USC.GISResearchLab.Websites.WebGIS.ApplicationStates;
using USC.GISResearchLab.Common.Web.StatefulPageManagement.StatefulMasterPages.AbstractClasses;
using USC.GISResearchLab.Common.Web.WebApplicationStates.Interfaces;

public partial class Master_Section_Services : AbstractUserManagableStatefulMasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            
            
        }
    }
}
