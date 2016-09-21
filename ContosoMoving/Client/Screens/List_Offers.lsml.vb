
Namespace LightSwitchApplication

    Public Class List_Offers

     
        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Product_Offers)
        End Sub
    End Class

End Namespace
