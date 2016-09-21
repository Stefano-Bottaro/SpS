
Namespace LightSwitchApplication

    Public Class CreateNewSupplier

        Private Sub CreateNewSupplier_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.SupplierProperty = New Supplier()
        End Sub

        Private Sub CreateNewSupplier_Saved()
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
            'Application.Current.ShowDefaultScreen(Me.SupplierProperty)
        End Sub

        Private Sub CreateNewSupplier_Closing(ByRef cancel As Boolean)
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub CreateNewSupplier_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.

        End Sub
    End Class

End Namespace