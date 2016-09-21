
Namespace LightSwitchApplication

    Public Class CreateNewService_History

        Private Sub CreateNewService_History_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Service_HistoryProperty = New Service_History()
        End Sub

        Private Sub CreateNewService_History_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            Application.Current.ShowDefaultScreen(Me.Service_HistoryProperty)
        End Sub

    End Class

End Namespace