
Namespace LightSwitchApplication

    Public Class Detail_Appointment

        Private Sub Appointment_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Appointment_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Detail_Appointment_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub New_Customer_Execute()
            ' Scrivere qui il codice.
            Me.Application.ShowCustomerDetail(Nothing)
        End Sub
    End Class

End Namespace