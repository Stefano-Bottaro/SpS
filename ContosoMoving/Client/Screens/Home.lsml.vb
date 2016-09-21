
Namespace LightSwitchApplication

    Public Class Home

        Private Sub NewCustomer_Execute()
            Application.ShowCreateNewCustomer()
        End Sub

        Private Sub NewAppointment_Execute()
            Application.ShowCreateNewAppointment(Nothing)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub
    End Class

End Namespace
