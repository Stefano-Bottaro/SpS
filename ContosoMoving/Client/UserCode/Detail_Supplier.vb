
Namespace LightSwitchApplication

    Public Class Detail_Supplier

        Private Sub Supplier_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Supplier)
        End Sub

        Private Sub Supplier_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Supplier)
        End Sub

        Private Sub Detail_Supplier_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Supplier)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub
    End Class

End Namespace