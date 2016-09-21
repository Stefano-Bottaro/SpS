
Namespace LightSwitchApplication

    Public Class Account_ListDetail

        Private Sub Account_List_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Account_List)
        End Sub

        Private Sub Account_List_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Account_List)
        End Sub

        Private Sub Account_ListDetail_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Account_List)
        End Sub

    End Class

End Namespace