
Namespace LightSwitchApplication

    Public Class List_Messagings

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Messagings)
        End Sub
    End Class

End Namespace
