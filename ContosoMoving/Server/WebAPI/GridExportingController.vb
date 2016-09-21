#Region "Copyright Syncfusion Inc. 2001 - 2014"
' Copyright Syncfusion Inc. 2001 - 2014. All rights reserved.
' Use of this code is subject to the terms of our license.
' A copy of the current license can be obtained at any time by e-mailing
' licensing@syncfusion.com. Any infringement will be prosecuted under
' applicable laws. 
#End Region
Imports Syncfusion.EJ.Export
Imports Syncfusion.JavaScript.Models
Imports Syncfusion.XlsIO
Imports EJ.DataVisualization
Imports EJ.Web

Imports System
Imports System.Collections
Imports System.Collections.Generic
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Reflection
Imports System.Web
Imports System.Web.Http
Imports LightSwitchApplication
Imports System.Web.Script.Serialization



Namespace LightSwitchApplication.WebAPI
    Public Class GridExportingController
        Inherits ApiController
        ' GET api/<controller>
        Public Function [Get]() As IEnumerable(Of String)
            Return New String() {"value1", "value2"}
        End Function


        ' GET api/<controller>/5
        Public Function [Get](id As Integer) As String
            Return "value"
        End Function


        ' POST api/<controller>
        Public Sub Post(<FromBody> value As String)
        End Sub


        ' PUT api/<controller>/5
        Public Sub Put(id As Integer, <FromBody> value As String)
        End Sub


        ' DELETE api/<controller>/5
        Public Sub Delete(id As Integer)
        End Sub
        <System.Web.Http.ActionName("ExcelExport")>
        <AcceptVerbs("POST")>
        Public Sub ExcelExport()
            Dim gridModel As String = HttpContext.Current.Request.Params("GridModel")
            Dim gridPropert As GridProperties = ConvertGridObject(gridModel)
            Dim exp As New ExcelExport()


            Using context As ServerApplicationContext = ServerApplicationContext.CreateContext()
                ' Dim data As IEnumerable = context.DataWorkspace.NORTHWNDEntitiesData.Orders.Cast(Of Order)().ToList()

                Dim data As IEnumerable = context.DataWorkspace.ApplicationData.Orders.Cast(Of Order)().ToList()
                exp.Export(gridPropert, DirectCast(data, IEnumerable), "Export.xlsx", ExcelVersion.Excel2010)
            End Using
        End Sub
        <System.Web.Http.ActionName("WordExport")>
        <AcceptVerbs("POST")>
        Public Sub WordExport()
            Dim gridModel As String = HttpContext.Current.Request.Params("GridModel")
            Dim gridPropert As GridProperties = ConvertGridObject(gridModel)
            Dim exp As New WordExport()

            Using context As ServerApplicationContext = ServerApplicationContext.CreateContext()
                Dim data As IEnumerable = context.DataWorkspace.ApplicationData.Orders.Cast(Of Order)().ToList()
                exp.Export(gridPropert, DirectCast(data, IEnumerable), "Export.docx")
            End Using
        End Sub
        <System.Web.Http.ActionName("PdfExport")>
        <AcceptVerbs("POST")>
        Public Sub PdfExport()
            Dim gridModel As String = HttpContext.Current.Request.Params("GridModel")
            Dim gridPropert As GridProperties = ConvertGridObject(gridModel)
            Dim exp As New PdfExport()
            Using context As ServerApplicationContext = ServerApplicationContext.CreateContext()
                'Dim data As IEnumerable = context.DataWorkspace.NORTHWNDEntitiesData.Orders.Cast(Of Order)().ToList()
                Dim data As IEnumerable = context.DataWorkspace.ApplicationData.Orders.Cast(Of Order)().ToList()
                exp.Export(gridPropert, DirectCast(data, IEnumerable), "Export.pdf")
            End Using
        End Sub
        Private Function ConvertGridObject(gridProperty As String) As GridProperties
            Dim serializer As New JavaScriptSerializer()
            Dim div As IEnumerable = DirectCast(serializer.Deserialize(gridProperty, GetType(IEnumerable)), IEnumerable)
            Dim gridProp As New GridProperties()
            For Each ds As KeyValuePair(Of String, Object) In div
                Dim [property] = gridProp.[GetType]().GetProperty(ds.Key, BindingFlags.Instance Or BindingFlags.[Public] Or BindingFlags.IgnoreCase)
                If [property] IsNot Nothing Then
                    Dim type As Type = [property].PropertyType
                    Dim serialize As String = serializer.Serialize(ds.Value)
                    Dim value As Object = serializer.Deserialize(serialize, type)
                    [property].SetValue(gridProp, value, Nothing)
                End If
            Next
            Return gridProp
        End Function
    End Class
End Namespace