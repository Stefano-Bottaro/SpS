
Namespace LightSwitchApplication

    Public Class CreateNew_Treatment

        Private Sub CreateNew_Treatment_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Service_DocumentProperty = New Order()
        End Sub

        Private Sub CreateNew_Treatment_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            Application.Current.ShowDefaultScreen(Me.Service_DocumentProperty)
        End Sub

    End Class

End Namespace