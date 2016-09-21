Imports System
Imports System.Collections.Generic
Imports System.ComponentModel
Imports System.ComponentModel.DataAnnotations
Imports System.Linq
Imports System.ServiceModel.DomainServices.Server
Imports System.Data.EntityClient
Imports System.Web.Configuration
Imports RiaService.LightSwitchApplication.Implementation


Public Class WFC_RIA_Service

    'Namespace WCF_RIA_Project
    ' This class is used as the class that is returned
    ' This can have any 'shape' you desire
    ' Make sure this is outside of the WCF_RIA_Service class
    ' but inside the WCF_RIA_Project namespace
    Public Class EnhancedOrder
        <Key> _
        Public Property ID() As Integer
            Get
                Return m_ID
            End Get
            Set(value As Integer)
                m_ID = Value
            End Set
        End Property
        Private m_ID As Integer
        Public Property UserName() As String
            Get
                Return m_UserName
            End Get
            Set(value As String)
                m_UserName = Value
            End Set
        End Property
        Private m_UserName As String
        Public Property OrderDate() As DateTime
            Get
                Return m_OrderDate
            End Get
            Set(value As DateTime)
                m_OrderDate = Value
            End Set
        End Property
        Private m_OrderDate As DateTime
        Public Property OrderTotal() As System.Nullable(Of Decimal)
            Get
                Return m_OrderTotal
            End Get
            Set(value As System.Nullable(Of Decimal))
                m_OrderTotal = Value
            End Set
        End Property
        Private m_OrderTotal As System.Nullable(Of Decimal)
    End Class
    Public Class WCF_RIA_Service
        Inherits DomainService
        ' This Context property is code that connects to the LightSwitch database
        ' The code in the Database connection region can be reused as it is 
#Region "Database connection"
        Private m_context As LightSwitchApplication.Implementation.ApplicationData
        Public ReadOnly Property Context() As LightSwitchApplication.Implementation.ApplicationData
            Get
                If Me.m_context Is Nothing Then
                    Dim connString As String = System.Web.Configuration.WebConfigurationManager.ConnectionStrings("_IntrinsicData").ConnectionString
                    Dim builder As New EntityConnectionStringBuilder()
                    builder.Metadata = "res://*/ApplicationData.csdl|res://*/ApplicationData.ssdl|res://*/ApplicationData.msl"
                    builder.Provider = "System.Data.SqlClient"
                    builder.ProviderConnectionString = connString
                    Me.m_context = New LightSwitchApplication.Implementation.ApplicationData(builder.ConnectionString)
                End If
                Return Me.m_context
            End Get
        End Property
#End Region
        <Query(IsDefault:=True)> _
        Public Function GetAllOrdersByMonth() As IQueryable(Of EnhancedOrder)
            ' Get all the Order Details
            ' Shape the results into the 
            ' EnhancedOrderDetail class
            ' The Order ID
            ' The Order Date
            ' The UserName
            ' The order Total
            ' Get all order details lines of the Order
            ' Group the products in the Order Details
            ' Shape a new entity
            ' Create a total property that is the Quantity times the
            ' Product price
            ' Add the sum of all the TotalOrders
            'Dim colEnhancedOrder = From Orders In Me.Context.OrdersNew EnhancedOrder() With { _
            '	Key.ID = Orders.Id, _
            '	Key.OrderDate = Orders.OrderDate, _
            '	Key.UserName = Orders.UserName, _
            '	Key.OrderTotal = (From grouping In From OrderDetails In Orders.OrderDetailsGroup OrderDetails By OrderDetails.OrderDetail_ProductNew With { _
            '		Key .TotalOrder = grouping.Sum(Function(x) x.Quantity) * grouping.Sum(Function(x) x.Product.ProductPrice) _
            '	}).Sum(Function(x) x.TotalOrder) _
            '}
            Dim total = Aggregate Order In Me.Context.Orders Into Sum(Order.Amount)
            Dim colEnhancedOrder = From Order In Me.Context.Orders.AsParallel()
                                    Group By Year = Order.Year,
                                            Month = Order.Month,
                                            Sector = Order.Order_Sector
                                    Into g = Group
                                    Select Year, Month, Sector, Count = g.Count(), Amount = g.Sum(Function(i) i.Amount), percentuale = g.Sum(Function(i) i.Amount) / total

            Return colEnhancedOrder
        End Function
        Public Function GetCustomerSegmentation() As IQueryable(Of Customer)
            ' '	SELECT Customers.Profession, SUM(Customers.Expense) as Expense, SUM(Customers.Expense_Last_Year) as Expense_Last_Year, avg(Customers.Frequency) as Frequency
            '	FROM [dbo].[Customers]
            '	GROUP BY Customers.Profession 
            ' *Totale Incasso ripartito per Categoria Cliente */
            'From cust In customers
            '       Group Join ord In orders On
            '         cust.CustomerID Equals ord.CustomerID
            '       Into CustomerOrders = Group,
            '            TotalOfOrders = Sum(ord.Amount)
            '       Select cust.CompanyName, cust.CustomerID,
            '              CustomerOrders, TotalOfOrders()
            Dim total = Aggregate customer In Me.Context.Customers Into Sum(customer.Expense_Last_Year)

            Dim colCustomerSegmentation = From Customer In Me.Context.Customers
                                          Order By Customer.Profession
                                          Group By CustomerProfession = Customer.Profession
                                          Into Profession = Group,
                                          Expense_Last_Year = Sum(Customer.Expense_Last_Year)
                                          Let percentuale = (Expense_Last_Year / total)
                                          Select Profession, Expense_Last_Year, percentuale

            Return colCustomerSegmentation
        End Function
        Public Function GetOrderItemByCategory() As IQueryable(Of Order_Item)
            'select Year, Month, Category, sum(Amount) as Amount, count(*) as frequency, avg(Amount) as average  from dbo.Order_Items
            'where Quantity >0
            'group by Year,Month, Category
            '/*Totale Incasso ripartito per Categorie (Stilistico....)*/

            Dim colOrderItemByCategory = From Order In Me.Context.Order_Items
                                         Where Order.Quantity > 0
                                          Order By Order.Category
                                          Group By Order.Year, Order.Month, Order.Category Into Group, Count(Order.Id), Sum(Order.Amount), Average(Order.Amount)


            Return colOrderItemByCategory
        End Function
        ' Override the Count method in order for paging to work correctly
        Protected Overrides Function Count(Of T)(query As IQueryable(Of T)) As Integer
            Return query.Count()
        End Function
    End Class




    '/*Totale Rivendita numero di clienti e fatturato  per mese la media nazionale e' 6% ma si puo' arivare al 15%*/
    'CREATE  VIEW [dbo].[SellByTipology]
    '	AS 
    'select Year, Month , Products.Tipology, count(distinct(Customer_Name)) as Customer, sum(Amount) as Amount from dbo.Order_Items, dbo.Products
    'where dbo.Order_Items.Service_History_Product1= dbo.Products.Id
    'Group by Year, Month, dbo.Products.Tipology

    '/*Totale Passaggi quante persone entrano in salone al mese (90/150 per addetto)*/
    'CREATE  VIEW [dbo].[SellByPassages]
    '	AS 
    'select Year,Month,count(Service_Document_Customer) as customer, sum(Amount) as Amount, count(distinct(dbo.Orders.Service_Document_Employee)) as Employee from dbo.Orders
    'Group by Year,Month

    '/*Totale Tagli quante persone hanno fatto il taglio al mese (1/4, 3/5)*/
    'CREATE VIEW [dbo].[SellByProducts]
    '	AS 
    'select Year, Month, Description, sum(Amount) as Amount, sum(Quantity) as Quantity from [dbo].[Order_Items]
    'where Quantity > 0
    'Group By  Year, Month, Description 

    'End Namespace
End Class
