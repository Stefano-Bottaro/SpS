
Namespace LightSwitchApplication

    Public Class List_Services

        Private Sub Ritorno_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Product_Services)
        End Sub

        Private Sub Add_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNew_Service()
        End Sub
    End Class

End Namespace
