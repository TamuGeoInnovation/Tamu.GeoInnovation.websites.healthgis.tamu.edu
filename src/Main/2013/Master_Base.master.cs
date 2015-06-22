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

public partial class Master_Base : AbstractUserManagableStatefulMasterPage
{
    #region Properties
    public virtual int PrintBarBlockHeight
    {
        get { return -1; }
    }
    public virtual int NavBarHeight
    {
        get { return -1; }
    }
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {
        if (String.IsNullOrEmpty(ApplicationState.BaseRequestPath))
        {
            ((ApplicationState)ApplicationState).BaseRequestPath = ResolveUrl("~/");
        }

        string virtualPathString = "";
        virtualPathString += "<script language=\"JavaScript\" type=\"text/javascript\">";
        virtualPathString += "    var linkRef = \"" + ResolveUrl("~/") + "\";";
        virtualPathString += "</script>";
        txtVirtualPath.Text = virtualPathString;

    }
}
