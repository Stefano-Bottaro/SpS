
Namespace LightSwitchApplication

    Public Class CreateNewEmployee

        Private Sub CreateNewEmployee_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Write your code here.
            Me.EmployeeProperty = New Employee()
        End Sub

        Private Sub CreateNewEmployee_Saved()
            ' Write your code here.
            Dim screens = Me.Application.ActiveScreens()
            For Each s In screens
                Dim screen = s.Screen
                screen.Details.Dispatcher.BeginInvoke(
                Sub()
                        screen.Refresh()
                    End Sub)
            Next
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.EmployeeProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub CreateNewEmployee_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.
           
        End Sub
    End Class

End Namespace