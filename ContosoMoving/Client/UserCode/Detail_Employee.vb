
Namespace LightSwitchApplication

    Public Class Detail_Employee

        Private Sub Employee_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Employee)
        End Sub

        Private Sub Employee_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Employee)
        End Sub

        Private Sub Detail_Employee_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Employee)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub
    End Class

End Namespace