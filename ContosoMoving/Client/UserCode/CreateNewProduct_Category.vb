
Namespace LightSwitchApplication

    Public Class CreateNewProduct_Category

        Private Sub CreateNewProduct_Category_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_CategoryProperty = New Product_Category()
        End Sub

        Private Sub CreateNewProduct_Category_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.Product_CategoryProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub CreateNewProduct_Category_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.

        End Sub
    End Class

End Namespace