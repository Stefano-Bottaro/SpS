
Namespace LightSwitchApplication

    Public Class List_Account_Lists

        Private Sub back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Account_Lists)

        End Sub
    End Class

End Namespace
