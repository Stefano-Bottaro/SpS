
Namespace LightSwitchApplication

    Public Class Detail_Product_Tax

        Private Sub Detail_Product_Tax_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_TaxProperty = New Product_Tax()
        End Sub

        Private Sub Detail_Product_Tax_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            Application.Current.ShowDefaultScreen(Me.Product_TaxProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub
    End Class

End Namespace