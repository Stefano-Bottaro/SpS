
Namespace LightSwitchApplication

    Public Class List_Calendar_Events

        Private Sub Ritorno_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Appointments)
        End Sub

        Private Sub Appointment_Execute()
            ' Scrivere qui il codice.
            Application.ShowDetail_Appointment(Nothing)
        End Sub
    End Class

End Namespace
