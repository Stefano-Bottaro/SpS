'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class SearchCurrentProjects

        Private Sub gridAddAndEditNew_Execute()
            'Open the new project screen. 
            ' We can't supply a customer ID here so the user will supply that on the screen
            Me.Application.ShowCreateNewProject(Nothing)
        End Sub
    End Class

End Namespace
