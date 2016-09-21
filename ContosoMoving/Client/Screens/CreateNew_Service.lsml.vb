
Namespace LightSwitchApplication

    Public Class CreateNew_Service

        Private Sub CreateNew_Service_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_ServiceProperty = New Product_Service()
        End Sub

        Private Sub CreateNew_Service_Saved()
            ' Scrivere qui il codice.
            Dim screens = Me.Application.ActiveScreens()
            For Each s In screens
                Dim screen = s.Screen
                screen.Details.Dispatcher.BeginInvoke(
                Sub()
                        screen.Refresh()
                    End Sub)
            Next
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.Product_ServiceProperty)
        End Sub


        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub
    End Class

End Namespace