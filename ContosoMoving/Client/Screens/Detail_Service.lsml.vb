
Namespace LightSwitchApplication

    Public Class Detail_Service

        Private Sub Product_Service_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product_Service)
        End Sub

        Private Sub Product_Service_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product_Service)
        End Sub

        Private Sub Detail_Service_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product_Service)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub
    End Class

End Namespace