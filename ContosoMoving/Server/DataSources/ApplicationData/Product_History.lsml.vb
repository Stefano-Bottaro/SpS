
Namespace LightSwitchApplication

    Public Class Product_History

        Private Sub Update_number()

            If Me.Quantity_Enter > 0 Then
                Me.Total = Me.Cost * Me.Quantity_Enter
            End If
            If Me.Quantity_Output > 0 Then
                Me.Total = Me.Cost * Me.Quantity_Output
            End If

        End Sub
        Private Sub Product_Changed()
            Me.Description = Me.Product.Description
            Me.Price_List = Me.Product.Price_List
            'Me.Discount = Me.Product_Document.Supplier.Discount
            Me.Code = Me.Product.Code
            Me.Category = Me.Product.Product_Category.Description
            Update_number()

        End Sub

        Private Sub Quantity_Enter_Changed()
            Update_number()
        End Sub

        'Private Sub Price_List_Changed()
        '    If Me.Product_Document.Shipping_percentual > 0 Then
        '        Me.Cost = Me.Price_List * (1 - Me.Discount) * (1 + Me.Product_Document.Shipping_percentual)
        '        Me.Shipping_Cost = Me.Product_Document.Shipping_percentual
        '    Else
        '        Me.Cost = Me.Price_List * (1 - Me.Discount)
        '    End If
        '    Me.Cost = Math.Round(CDec(Me.Cost), 2)
        '    Update_number()
        'End Sub

        'Private Sub Discount_Changed()
        '    If Me.Product_Document.Shipping_percentual > 0 Then
        '        Me.Cost = Me.Price_List * (1 - Me.Discount) * (1 + Me.Product_Document.Shipping_percentual)
        '        Me.Shipping_Cost = Me.Product_Document.Shipping_percentual
        '    Else
        '        Me.Cost = Me.Price_List * (1 - Me.Discount)
        '    End If
        '    Me.Cost = Math.Round(CDec(Me.Cost), 2)
        '    Update_number()
        'End Sub
    End Class

End Namespace
