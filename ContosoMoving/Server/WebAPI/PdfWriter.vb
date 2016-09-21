
Imports System.Data
Imports System.Text
Imports System.Drawing
Imports System.Drawing.Imaging
Imports System.IO
Imports System.Linq
Imports System.Configuration
Imports System.Web
Imports System.Web.Security
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.UI.WebControls.WebParts
Imports System.Web.UI.HtmlControls
Imports Syncfusion.ReportWriter
Imports System.Collections
Imports System.Collections.Generic
Imports Syncfusion.Windows.Reports

Partial Public Class _Default
    Inherits System.Web.UI.Page
#Region "Page Load"
    ''' <summary>
    ''' Handles the page load
    ''' </summary>
    ''' <param name="sender"></param>
    ''' <param name="e"></param>
    Protected Sub Page_Load(sender As Object, e As EventArgs)
    End Sub
#End Region

    ''' <summary>
    ''' Generates a document
    ''' </summary>
    ''' <param name="sender"></param>
    ''' <param name="e"></param>
    Protected Sub ExportButton_Click(sender As Object, e As EventArgs)
        Try
            Dim fileName As String = Nothing
            Dim format As WriterFormat
            Dim httpContext As HttpContext = System.Web.HttpContext.Current
            Dim reportWriter As New ReportWriter(New CommonReportLocator().GetRDLCPath("InvoiceTemplate.rdlc"))
            reportWriter.SetParameters(GetParameter())
            reportWriter.DataSources = GetDataSource()

            If Me.ExportFormat.SelectedValue = "PDF" Then
                fileName = "InvoiceTemplate.pdf"
                format = WriterFormat.PDF
            ElseIf Me.ExportFormat.SelectedValue = "Word" Then
                fileName = "InvoiceTemplate.doc"
                format = WriterFormat.Word
            ElseIf Me.ExportFormat.SelectedValue = "Html" Then
                fileName = "InvoiceTemplate.Html"
                format = WriterFormat.HTML
            Else
                fileName = "InvoiceTemplate.xls"
                format = WriterFormat.Excel
            End If
            reportWriter.Save(fileName, format, httpContext.Response)
        Catch
        End Try
    End Sub

    Public Function GetDataSource() As ReportDataSourceCollection
        Dim paramCollection As IList(Of ReportParameter) = GetParameter()
        Dim value As String = paramCollection.Where(Function(p) p.Name.Equals("InvoiceID")).FirstOrDefault().Values.FirstOrDefault()
        Dim dataSources As New ReportDataSourceCollection()

        If Not String.IsNullOrEmpty(value) Then
            dataSources.Add(New ReportDataSource() With {
                Key.Name = "ShipDetails",
                Key.Value = ShipDetails.GetData(value)
            })
            dataSources.Add(New ReportDataSource() With {
                Key.Name = "OrderDetails",
                Key.Value = OrderDetails.GetData(value)
            })
            dataSources.Add(New ReportDataSource() With {
                Key.Name = "InvoiceDetails",
                Key.Value = InvoiceDetails.GetData(value)
            })
        End If
        Return dataSources
    End Function

    Public Function GetParameter() As IList(Of ReportParameter)
        Dim parameters As New List(Of ReportParameter)()
        Dim param As New ReportParameter()
        param.Labels.Add("10248")
        param.Values.Add("10248")
        param.Name = "InvoiceID"
        parameters.Add(param)

        Return parameters
    End Function
End Class
#Region "ShipDetails"

Public Class ShipDetails
    Public Property ShipName() As String
        Get
            Return m_ShipName
        End Get
        Set
            m_ShipName = Value
        End Set
    End Property
    Private m_ShipName As String
    Public Property ShipAddress() As String
        Get
            Return m_ShipAddress
        End Get
        Set
            m_ShipAddress = Value
        End Set
    End Property
    Private m_ShipAddress As String
    Public Property Freight() As Double
        Get
            Return m_Freight
        End Get
        Set
            m_Freight = Value
        End Set
    End Property
    Private m_Freight As Double
    Public Property ShippedDate() As DateTime
        Get
            Return m_ShippedDate
        End Get
        Set
            m_ShippedDate = Value
        End Set
    End Property
    Private m_ShippedDate As DateTime
    Public Property ShipCity() As String
        Get
            Return m_ShipCity
        End Get
        Set
            m_ShipCity = Value
        End Set
    End Property
    Private m_ShipCity As String
    Public Property ShipCountry() As String
        Get
            Return m_ShipCountry
        End Get
        Set
            m_ShipCountry = Value
        End Set
    End Property
    Private m_ShipCountry As String
    Public Property OrderID() As String
        Get
            Return m_OrderID
        End Get
        Set
            m_OrderID = Value
        End Set
    End Property
    Private m_OrderID As String
    Public Shared Function GetData(orderId As String) As IList
        Dim ShipDetailsCollection As New List(Of ShipDetails)()
        Dim shipDetail As ShipDetails = Nothing
        shipDetail = New ShipDetails() With {
            Key.ShipName = "Vins Chevalier",
            Key.ShipAddress = "59 rue de l'Abbaye",
            Key.Freight = 32.38,
            Key.ShippedDate = New DateTime(2003, 12, 23),
            Key.ShipCity = "Reims",
            Key.ShipCountry = "France",
            Key.OrderID = "10248"
        }
        ShipDetailsCollection.Add(shipDetail)

        shipDetail = New ShipDetails() With {
            Key.ShipName = "Vins",
            Key.ShipAddress = "59 rue",
            Key.Freight = 32.38,
            Key.ShippedDate = New DateTime(2003, 12, 23),
            Key.ShipCity = "Reims",
            Key.ShipCountry = "France",
            Key.OrderID = "10249"
        }
        ShipDetailsCollection.Add(shipDetail)

        Return ShipDetailsCollection.Where(Function(sd) sd.OrderID.Equals(orderId)).ToList()
    End Function
End Class


#End Region

#Region "InvoiceDetails"
Public Class InvoiceDetails
    Public Property OrderID() As String
        Get
            Return m_OrderID
        End Get
        Set
            m_OrderID = Value
        End Set
    End Property
    Private m_OrderID As String

    Public Shared Function GetData(orderId As String) As IList
        Dim invoiceDetailsCollection As New List(Of InvoiceDetails)()
        Dim invoiceDetail As InvoiceDetails = Nothing

        invoiceDetail = New InvoiceDetails() With {
            Key.OrderID = "10248"
        }
        invoiceDetailsCollection.Add(invoiceDetail)
        invoiceDetail = New InvoiceDetails() With {
            Key.OrderID = "10249"
        }
        invoiceDetailsCollection.Add(invoiceDetail)
        Return invoiceDetailsCollection
    End Function
End Class
#End Region

#Region "OrderDetails"

Public Class OrderDetails
    Public Property ProductID() As String
        Get
            Return m_ProductID
        End Get
        Set
            m_ProductID = Value
        End Set
    End Property
    Private m_ProductID As String
    Public Property ProductName() As String
        Get
            Return m_ProductName
        End Get
        Set
            m_ProductName = Value
        End Set
    End Property
    Private m_ProductName As String
    Public Property Quantity() As String
        Get
            Return m_Quantity
        End Get
        Set
            m_Quantity = Value
        End Set
    End Property
    Private m_Quantity As String
    Public Property UnitPrice() As Double
        Get
            Return m_UnitPrice
        End Get
        Set
            m_UnitPrice = Value
        End Set
    End Property
    Private m_UnitPrice As Double
    Public Property Discount() As Double
        Get
            Return m_Discount
        End Get
        Set
            m_Discount = Value
        End Set
    End Property
    Private m_Discount As Double
    Public Property OrderID() As String
        Get
            Return m_OrderID
        End Get
        Set
            m_OrderID = Value
        End Set
    End Property
    Private m_OrderID As String
    Public ReadOnly Property Price() As Double
        Get
            Return (UnitPrice * Double.Parse(Quantity))
        End Get
    End Property
    Public Shared Function GetData(orderId As String) As IList
        Dim OrderDetailsCollection As New List(Of OrderDetails)()
        Dim orderDetail As OrderDetails = Nothing

        orderDetail = New OrderDetails() With {
            Key.ProductID = "11",
            Key.Quantity = "12",
            Key.UnitPrice = 14,
            Key.Discount = 0,
            Key.OrderID = "10248",
            Key.ProductName = "Queso Cabrales"
        }
        OrderDetailsCollection.Add(orderDetail)
        orderDetail = New OrderDetails() With {
            Key.ProductID = "42",
            Key.Quantity = "10",
            Key.UnitPrice = 9.8,
            Key.Discount = 0,
            Key.OrderID = "10248",
            Key.ProductName = "Mozzarella di Giovanni"
        }
        OrderDetailsCollection.Add(orderDetail)
        orderDetail = New OrderDetails() With {
            Key.ProductID = "72",
            Key.Quantity = "5",
            Key.UnitPrice = 34.8,
            Key.Discount = 0,
            Key.OrderID = "10248",
            Key.ProductName = "Singaporean Hokkien Fried Mee"
        }
        OrderDetailsCollection.Add(orderDetail)

        orderDetail = New OrderDetails() With {
            Key.ProductID = "72",
            Key.Quantity = "5",
            Key.UnitPrice = 34.8,
            Key.Discount = 0,
            Key.OrderID = "10249",
            Key.ProductName = "Singaporean"
        }
        OrderDetailsCollection.Add(orderDetail)
        Return OrderDetailsCollection.Where(Function(od) od.OrderID.Equals(orderId)).ToList()
    End Function
End Class

#End Region