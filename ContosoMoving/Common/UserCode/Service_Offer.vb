
Namespace LightSwitchApplication

    Public Class Service_Offer

        Private Sub Product_Service_Changed()
            ' se cambio il prezzo
            Me.Price = Product_Service.Price
            If Me.Offer_Discount > 0 Then
                Me.Offer_Price = Me.Price * (1 - Me.Offer_Discount)
                Me.Offer_Price = Math.Round(CDec(Me.Offer_Price), 2)
            End If
        End Sub

        Private Sub Offer_Discount_Changed()
            ' se cambio lo sconto
            If Me.Offer_Discount > 0 Then
                Me.Offer_Price = Me.Price * (1 - Me.Offer_Discount)
                Me.Offer_Price = Math.Round(CDec(Me.Offer_Price), 2)
            End If
        End Sub

        Private Sub Offer_Price_Changed()
            Me.Offer_Discount = Math.Round(CDec(Me.Offer_Price / Me.Price), 2)
        End Sub
    End Class

End Namespace
