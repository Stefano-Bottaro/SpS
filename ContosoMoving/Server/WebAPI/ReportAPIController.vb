
#Region "Copyright Syncfusion Inc. 2001 - 2014"
' Copyright Syncfusion Inc. 2001 - 2014. All rights reserved.
' Use of this code is subject to the terms of our license.
' A copy of the current license can be obtained at any time by e-mailing
' licensing@syncfusion.com. Any infringement will be prosecuted under
' applicable laws. 
#End Region

Imports Syncfusion.EJ.ReportViewer
Imports Syncfusion.Reports.EJ
Imports System.Collections
Imports System.Collections.Generic
Imports System.Linq
Imports System.Net
Imports System.Web.Http

Namespace LightSwitchApplication.WebAPI
    Public Class ReportAPIController
        Inherits ApiController
        Implements IReportController
        Public Function PostReportAction(jsonResult As Dictionary(Of String, Object)) As Object
            Return ReportHelper.ProcessReport(jsonResult, Me)
        End Function

        <System.Web.Http.ActionName("GetResource")>
        <AcceptVerbs("GET")>
        Public Function GetResource(key As String, resourcetype As String, isPrint As Boolean) As Object
            Return ReportHelper.GetResource(key, resourcetype, isPrint)
        End Function

        Public Sub OnInitReportOptions(reportOption As ReportViewerOptions)
            Dim hostedPath = System.Web.HttpContext.Current.Server.MapPath("~/")
            'var samplePath = hostedPath.Substring(0, hostedPath.IndexOf("SampleBrowser"));
            Dim rdlPath = hostedPath + "bin\SampleBrowser.Server\ReportTemplate\" + reportOption.ReportModel.ReportPath
            reportOption.ReportModel.ReportPath = rdlPath
        End Sub

        Public Sub OnReportLoaded(reportOption As ReportViewerOptions)
            reportOption.ReportModel.DataSources.Clear()
            reportOption.ReportModel.DataSources.Add(New ReportDataSource() With {
                'Key.Name = "TopSalesPerson",
                'Key.Value = SalesPersons.GetTopSalesPerson()
            })
            reportOption.ReportModel.DataSources.Add(New ReportDataSource() With {
                'Key.Name = "TopStores",
                'Key.Value = Stores.GetTopStores()
            })
        End Sub

        Private Function IReportController_PostReportAction(jsonResult As Dictionary(Of String, Object)) As Object Implements IReportController.PostReportAction
            Throw New NotImplementedException()
        End Function

        Private Sub IReportController_OnInitReportOptions(reportOption As ReportViewerOptions) Implements IReportController.OnInitReportOptions
            Throw New NotImplementedException()
        End Sub

        Private Sub IReportController_OnReportLoaded(reportOption As ReportViewerOptions) Implements IReportController.OnReportLoaded
            Throw New NotImplementedException()
        End Sub

        Private Function IReportController_GetResource(key As String, resourcetype As String, isPrint As Boolean) As Object Implements IReportController.GetResource
            Throw New NotImplementedException()
        End Function
    End Class
End Namespace

