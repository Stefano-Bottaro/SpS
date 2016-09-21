
Namespace LightSwitchApplication

    Public Class CreateNewProduct_Brand

        Private Sub CreateNewProduct_Brand_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_BrandProperty = New Product_Brand()
        End Sub

        Private Sub CreateNewProduct_Brand_Saved()
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
            ' Application.Current.ShowDefaultScreen(Me.Product_BrandProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

       
        Private Sub CreateNewProduct_Brand_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.

        End Sub
    End Class

End Namespace