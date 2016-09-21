
Namespace LightSwitchApplication

    Public Class Product_Offer

        Private Sub Products_Changed()
            Me.Price = Me.Products.Price
            Me.Offer_Discount = 0.2
            Me.Offer_Price = Me.Products.Price * Me.Offer_Discount
        End Sub

        Private Sub Price_Changed()
            If Not Me.Offer_Price Is Nothing Then
                Me.Offer_Discount = Math.Round(CDec(1 - (Me.Price / Me.Offer_Price)), 2)
            End If

        End Sub

        Private Sub Offer_Discount_Changed()
            Me.Offer_Price = Me.Products.Price - (Me.Products.Price * Me.Offer_Discount)
        End Sub

        Private Sub Data_Start_Changed()
            Me.Data_End = Me.Data_Start.AddDays(30)
        End Sub
    End Class

End Namespace
