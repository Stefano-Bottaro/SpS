#Region "Copyright Syncfusion Inc. 2001 - 2014"
' Copyright Syncfusion Inc. 2001 - 2014. All rights reserved.
' Use of this code is subject to the terms of our license.
' A copy of the current license can be obtained at any time by e-mailing
' licensing@syncfusion.com. Any infringement will be prosecuted under
' applicable laws. 
#End Region
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Http
Imports System.Web.Security
Imports System.Web.SessionState

Namespace LightSwitchApplication
    Public Class [Global]
        Inherits System.Web.HttpApplication

        Protected Sub Application_Start(sender As Object, e As EventArgs)
            System.Web.Http.GlobalConfiguration.Configuration.Routes.MapHttpRoute(name:="DefaultApi", routeTemplate:="api/{controller}/{action}/{id}", defaults:=New With {
                Key .id = RouteParameter.[Optional]
            })
            'Session.LCID = 1040
            'HttpContext.Current.Session.LCID = 1040
            AppDomain.CurrentDomain.SetData("SQLServerCompactEditionUnderWebHosting", True)
        End Sub
    End Class
End Namespace
