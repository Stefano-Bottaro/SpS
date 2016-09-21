
Namespace LightSwitchApplication

    Public Class CreateNew_Service

        Private Sub CreateNew_Service_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_ServiceProperty = New Product_Service()
        End Sub

        Private Sub CreateNew_Service_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.Product_ServiceProperty)
        End Sub

        Private Sub CreateNew_Service_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.

        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub
    End Class

End Namespace