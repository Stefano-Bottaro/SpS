
Namespace LightSwitchApplication

    Public Class List_Suppliers

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub


        Private Sub SupplierListAddAndEditNew_Execute()
            ' Scrivere qui il codice.

        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Suppliers)
        End Sub
    End Class

End Namespace
