
Namespace LightSwitchApplication

    Public Class Detail_Product_Brand

        Private Sub Detail_Product_Brand_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_BrandProperty = New Product_Brand()
        End Sub

        Private Sub Detail_Product_Brand_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            Application.Current.ShowDefaultScreen(Me.Product_BrandProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub
    End Class

End Namespace