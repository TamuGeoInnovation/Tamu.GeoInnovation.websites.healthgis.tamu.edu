﻿using System;
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

public partial class Master_Section : Master_Base
{
    #region Properties
    public override int PrintBarBlockHeight
    {
        get { return 75; }
    }
    public override int NavBarHeight
    {
        get { return 50; }
    }
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {

    }
}
