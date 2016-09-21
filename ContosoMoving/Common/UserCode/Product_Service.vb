
Namespace LightSwitchApplication

    Public Class Product_Service

        Private Sub Price_Changed()
            Me.Point = Int(Price / 10)
            If Not Me.Product_Tax Is Nothing Then
                Me.Amount = Math.Round(CDec(Me.Price / (1 + Me.Product_Tax.Value)), 2)
                '122*(22/122)
                Me.Vat = Math.Round(CDec(Me.Amount * Me.Product_Tax.Value), 2)
            End If
        End Sub


        Private Sub created_Validate(results As EntityValidationResultsBuilder)
            ' results.AddPropertyError("<Messaggio di errore>")
            If Me.created = Nothing Then
                created = Now
            End If
        End Sub

        Private Sub Product_Tax_Changed()
            If Me.Price > 0 Then
                Me.Amount = Math.Round(CDec(Price / (1 + Me.Product_Tax.Value)), 2)
                Me.Vat = Math.Round(CDec(Price - (Price / (1 + Me.Product_Tax.Value))), 2)
            End If
        End Sub
    End Class

End Namespace
