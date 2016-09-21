
Namespace LightSwitchApplication

    Public Class List_Companies

        Private Sub Popolamento_Iniziale_Execute()
            ' Scrivere qui il codice.

        End Sub

        Private Sub Ritorno_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Companies)
        End Sub
    End Class

End Namespace
