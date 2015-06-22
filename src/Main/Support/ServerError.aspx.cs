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
using USC.GISResearchLab.Common.Web.StatefulPageManagement.StatefulMasterPages.AbstractClasses;

public partial class Support_ServerError : AbstractStatefulPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string errorGuid = Request["guid"];
        if (!String.IsNullOrEmpty(errorGuid))
        {
            DataTable dataTable = ApplicationState.ErrorManager.GetErrorByGuid(errorGuid);
            if (dataTable != null && dataTable.Rows.Count > 0)
            {
                txtErrorDate.Text = Convert.ToString(dataTable.Rows[0]["errorDateTime"]);
                txtErrorIP.Text = Convert.ToString(dataTable.Rows[0]["userIPAddress"]);

                string message = Convert.ToString(dataTable.Rows[0]["errorMessage"]);

                if (message.Contains("<") || message.Contains(">"))
                {
                    message = Server.HtmlEncode(message);
                }

                txtErrorMessage.Text = Convert.ToString(message);
            }
        }
    }
}