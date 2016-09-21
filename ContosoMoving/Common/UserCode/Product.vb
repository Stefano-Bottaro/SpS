
Namespace LightSwitchApplication

    Public Class Product

       
        Private Sub Update_number()
           
            If Not Me.Mark_Up Is Nothing And Not Me.Product_Tax Is Nothing And Not Me.Cost Is Nothing Then
                If Me.Shipping_Cost > 0 Then
                    Me.Price = Me.Cost * (1 + Me.Mark_Up) * (1 + Me.Shipping_Cost) * (1 + Me.Product_Tax.Value)
                Else
                    Me.Shipping_Cost = 0
                    Me.Price = Me.Cost * (1 + Me.Mark_Up) * (1 + Me.Product_Tax.Value)
                End If
                Me.Price = Math.Round(CDec(Me.Price), 2)
            End If
            If Not Me.Stock Is Nothing And Not Me.Cost Is Nothing Then
                Me.Stock_Value = Me.Cost * Me.Stock
            End If
            If Not Me.Volume_Sold Is Nothing And Not Me.Stock Is Nothing Then
                Me.Turnover_Index = Me.Volume_Sold / Me.Stock
            Else
                Me.Turnover_Index = 0
            End If
            If Me.Minimum_stock > 0 And Me.Turnover_Index > 0 Then
                Me.To_order = Int((Me.Minimum_stock * Me.Turnover_Index) - Me.Stock + 0.99)
            End If
            Me.Point = Math.Round(CInt(Price / 10), 0)
        End Sub

        Private Sub Stock_Changed()
            If Me.Stock > 0 And Me.Cost > 0 Then
                Update_number()
            End If

        End Sub

        Private Sub Price_List_Changed()
            If Me.Discount > 0 And Me.Price_List > 0 Then
                Me.Cost = Me.Price_List * (1 - Me.Discount)
                Me.Cost = Math.Round(CDec(Me.Cost), 2)
                Update_number()
            End If

        End Sub

        Private Sub Discount_Changed()
            If Me.Price_List > 0 And Me.Discount > 0 Then
                Me.Cost = Me.Price_List * (1 - Me.Discount)
                Me.Cost = Math.Round(CDec(Me.Cost), 2)
                Update_number()
            End If

        End Sub

        Private Sub Shipping_Cost_Changed()
            If Me.Price_List > 0 And Me.Discount > 0 Then
                Update_number()
            End If

        End Sub

        Private Sub Mark_Up_Changed()
            If Me.Price_List > 0 And Me.Discount > 0 Then
                Update_number()
            End If
        End Sub

        Private Sub Product_Tax_Changed()
            If Me.Price_List > 0 And Me.Discount > 0 Then
                Update_number()
            End If
        End Sub

        
        
        
    End Class

End Namespace
