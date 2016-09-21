
Namespace LightSwitchApplication

    Public Class CreateNewProduct

        Private Sub CreateNewProduct_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.ProductProperty = New Product()
        End Sub

        Private Sub CreateNewProduct_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.ProductProperty)
        End Sub

        Private Sub CreateNewProduct_Closing(ByRef cancel As Boolean)
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub
    End Class

End Namespace