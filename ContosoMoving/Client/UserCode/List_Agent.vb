
Namespace LightSwitchApplication

    Public Class List_Agent

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Agents)
        End Sub
    End Class

End Namespace
