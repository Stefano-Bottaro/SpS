
Namespace LightSwitchApplication

    Public Class Service_History

        Private Sub Product_Service_Changed()
            Me.Description = Me.Product_Service.Description
            Me.Category = Me.Product_Service.Service_Tipology.Description
            Me.Discount = Me.Service_Document.Customer.Discount
            Me.Point = Me.Product_Service.Point
            Me.Price_List = Me.Product_Service.Price
            Me.Quantity = 1
            Me.Customer_Name = String.Format("{0} {1}", Service_Document.Customer.LastName, Service_Document.Customer.FirstName)
            Me.Employee_Name = Me.Service_Document.Employee.Summary
            Me.Year = Now.Year
            Me.Month = Now.Month
        End Sub

        Private Sub Quantity_Changed()
            If Me.Discount > 0 Then
                Me.Price = Math.Round(CDec(Me.Price_List * (1 - Me.Discount)), 2)
            Else
                Me.Price = Me.Price_List
            End If
            If Not Me.Product_Service Is Nothing Then
                '*********************se sto vendendo servizi               
                Me.Point = Me.Product_Service.Point * Me.Quantity
                Me.Vat_perc = Math.Round(CDec(Product_Service.Product_Tax.Value), 2)
                Me.Amount = Math.Round(CDec(Price / (1 + Product_Service.Product_Tax.Value)), 2) * Quantity
                Me.Vat = Math.Round(CDec(Price - (Price / (1 + Product_Service.Product_Tax.Value))), 2) * Quantity
                Me.Total = Me.Price * Me.Quantity
                Me.Commission = Math.Round(CDec(Me.Total * (Me.Product_Service.Commission_employee)), 2)
            Else
                '********************se sto vendendo prodotti             
                Me.Point = Me.Product.Point * Me.Quantity
                Me.Vat_perc = Math.Round(CDec(Product.Product_Tax.Value), 2)
                Me.Amount = Math.Round(CDec(Price / (1 + Product.Product_Tax.Value)), 2) * Quantity
                Me.Vat = Math.Round(CDec(Price - (Price / (1 + Product.Product_Tax.Value))), 2) * Quantity
                Me.Total = Me.Price * Me.Quantity
                Me.Commission = Math.Round(CDec(Me.Total * (Me.Product.Commission_employee)), 2)
            End If

            Dim am As Decimal
            Dim cm As Decimal
            Dim vt As Decimal
            Dim tt As Decimal
            Dim pt As Integer
            For Each obj In Me.Service_Document.Service_Histories
                am = am + obj.Amount
                vt = vt + obj.Vat
                tt = tt + obj.Total
                cm = cm + obj.Commission
                If Not obj.Point Is Nothing Then
                    pt = pt + obj.Point.Value
                End If
            Next (obj)
            Me.Service_Document.Amount = am
            Me.Service_Document.Vat = vt
            Me.Service_Document.Total = tt
            Me.Service_Document.Points = pt
            Me.Service_Document.Payoff = tt
            Me.Service_Document.Commission = cm
        End Sub

        Private Sub Product_Changed()
            Me.Description = Me.Product.Description
            Me.Category = Me.Product.Product_Category.Description
            Me.Discount = Me.Service_Document.Customer.Discount
            Me.Point = Me.Product.Point
            Me.Price_List = Me.Product.Price
            Me.Quantity = 1
            Me.Customer_Name = String.Format("{0} {1}", Service_Document.Customer.LastName, Service_Document.Customer.FirstName)
            Me.Employee_Name = Me.Service_Document.Employee.Summary
            Me.Year = Now.Year
            Me.Month = Now.Month
        End Sub

    End Class

End Namespace
