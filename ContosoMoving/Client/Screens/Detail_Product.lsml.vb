
Namespace LightSwitchApplication

    Public Class Detail_Product

        Private Sub Product_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product)
        End Sub

        Private Sub Product_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product)
        End Sub

        Private Sub Detail_Product_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

     
        Private Sub NewBrand_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewProduct_Brand()
        End Sub

        Private Sub NewCategory_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewProduct_Category()
        End Sub
    End Class

End Namespace