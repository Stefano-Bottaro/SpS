
Namespace LightSwitchApplication

    Public Class List_Account_Operations

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Account_Operations)
        End Sub
    End Class

End Namespace
