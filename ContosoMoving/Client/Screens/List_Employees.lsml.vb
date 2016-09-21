
Namespace LightSwitchApplication

    Public Class List_Employees

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Employees)
        End Sub
    End Class

End Namespace
