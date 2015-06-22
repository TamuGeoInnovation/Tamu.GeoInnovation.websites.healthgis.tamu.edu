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

public partial class Support_MissingPage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string requestUrl = Request["url"];
        if (requestUrl != null)
        {
            txtRequestUrl.Text = requestUrl;
        }

        txtRequestTime.Text = DateTime.Now.ToString();
        txtRequestIP.Text = Request.UserHostAddress;
    }

}
