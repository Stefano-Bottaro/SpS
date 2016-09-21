
Namespace LightSwitchApplication

    Public Class CreateNewAccount_List

        Private Sub CreateNewAccount_List_InitializeDataWorkspace(saveChangesTo As List(Of Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Account_ListProperty = New Account_List()
        End Sub

        Private Sub CreateNewAccount_List_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            Application.Current.ShowDefaultScreen(Me.Account_ListProperty)
        End Sub

        Private Sub CreateNewAccount_List_Closing(ByRef cancel As Boolean)
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        
    End Class

End Namespace