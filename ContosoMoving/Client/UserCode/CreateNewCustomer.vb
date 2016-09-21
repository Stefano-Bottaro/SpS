
Namespace LightSwitchApplication

    Public Class CreateNewCustomer

        Private Sub CreateNewCustomer_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Write your code here.
            Me.CustomerProperty = New Customer()
        End Sub

        Private Sub CreateNewCustomer_Saved()
            ' Write your code here.
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.CustomerProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub CreateNewCustomer_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.

        End Sub
    End Class

End Namespace