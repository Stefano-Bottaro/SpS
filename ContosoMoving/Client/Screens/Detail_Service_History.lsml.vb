
Namespace LightSwitchApplication

    Public Class Detail_Service_History

        Private Sub Service_History_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Service_History)
        End Sub

        Private Sub Service_History_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Service_History)
        End Sub

        Private Sub Detail_Service_History_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Service_History)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)

        End Sub
    End Class

End Namespace