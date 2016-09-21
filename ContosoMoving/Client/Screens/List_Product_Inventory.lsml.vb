
Namespace LightSwitchApplication

    Public Class List_Product_Inventory

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Products)
        End Sub
    End Class

End Namespace
