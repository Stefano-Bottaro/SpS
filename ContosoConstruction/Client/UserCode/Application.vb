'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 
Namespace LightSwitchApplication

    Public Class Application

        Friend LoggedInEmployee As Employee

        Private Sub Application_LoggedIn()
            'Look up the logged in user in the Employee table. The UserName stored there is the 
            ' same as what is stored in the Users security administration screen.
            Me.LoggedInEmployee = Me.CreateDataWorkspace.ApplicationData.GetEmployeeByUserName(Me.User.Name)
        End Sub

        Private Sub ManageEmployees_CanRun(ByRef result As Boolean)
            result = Me.User.HasPermission(Permissions.SecurityAdministration)
        End Sub
    End Class

End Namespace
