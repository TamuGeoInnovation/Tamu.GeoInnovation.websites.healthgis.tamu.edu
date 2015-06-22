using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts; 
 using USC.GISResearchLab.Common.Web.StatefulPageManagement.StatefulPages.AbstractClasses;
using USC.GISResearchLab.Websites.WebGIS.ApplicationStates;

public partial class Services_Default : AbstractStatefulPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                
            }
        }
        catch (Exception ex)
        {
            ((ApplicationState)ApplicationState).HandleException(this.Title, this, ex, this.Context.Request, this.Context.Response);
        }
    }


}
