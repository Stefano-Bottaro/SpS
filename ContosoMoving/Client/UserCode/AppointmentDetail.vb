
Namespace LightSwitchApplication

    Public Class AppointmentDetail

        Private Sub Appointment_Loaded(succeeded As Boolean)
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Appointment_Changed()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub AppointmentDetail_Saved()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub
    End Class

End Namespace