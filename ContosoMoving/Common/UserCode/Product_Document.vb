
Namespace LightSwitchApplication

    Public Class Product_Document

        Private Sub Supplier_Changed()
            Me.Payment_Type = Me.Supplier.Payment_Type
            Me.Payment_Number = Me.Supplier.Rates
            Me.Deferrals = Me.Supplier.Deferrals
        End Sub

        Private Sub ricalcolo()
            If Me.Taxable_Amount > 0 Then
                Me.Total = Me.Taxable_Amount
            End If
            If Me.Vat > 0 Then
                Me.Total = Me.Total + Me.Vat
            End If
            If Me.Shipping_Cost > 0 Then
                Me.Total = Me.Total + Me.Shipping_Cost
                If Me.Taxable_Amount > 0 Then
                    Me.Shipping_percentual = Math.Round(CDec(Me.Shipping_Cost / Me.Taxable_Amount), 2)
                End If

            End If

        End Sub
        Private Sub Taxable_Amount_Changed()
            ricalcolo()
        End Sub

        Private Sub Vat_Changed()
            ricalcolo()
        End Sub

        Private Sub Shipping_Cost_Changed()
            ricalcolo()
        End Sub

        Private Sub Check_Compute(ByRef result As System.Nullable(Of Decimal))
            Dim Tot As Decimal
            For Each entity In Me.Product_Histories
                Tot = Tot + entity.Total
            Next
            result = Tot

        End Sub


    End Class

End Namespace
