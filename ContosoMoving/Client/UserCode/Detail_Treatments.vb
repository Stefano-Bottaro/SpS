
Namespace LightSwitchApplication

    Public Class Detail_Treatments

        Private Sub Product_Document_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product_Document)
        End Sub

        Private Sub Product_Document_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product_Document)
        End Sub

        Private Sub Detail_Treatments_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Product_Document)
        End Sub

    End Class

End Namespace