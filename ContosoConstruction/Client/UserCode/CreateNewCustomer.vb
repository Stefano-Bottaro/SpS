'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class CreateNewCustomer

        Private Sub CreateNewCustomer_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            ' Write your code here.
            Me.CustomerProperty = New Customer()

            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("customer.png")
            Me.Text_ScreenTitle = "New Customer"
        End Sub

        Private Sub CreateNewCustomer_Saved()
            'Comment this default code out so users can click the NewProject button
            'Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.CustomerProperty)
        End Sub

        Private Sub NewProject_CanExecute(ByRef result As Boolean)
            result = (Me.CustomerProperty.Details.EntityState <> EntityState.Added)
        End Sub

        Private Sub NewProject_Execute()
            'Show a new project screen but pass the customer ID so it is automatically filled out
            Me.Application.ShowCreateNewProject(Me.CustomerProperty.Id)
        End Sub

        Private Sub NewAppointment_Execute()
            'Show a new appointment screen but pass the customer ID so it is automatically filled out
            Me.Application.ShowCreateNewAppointment(Me.CustomerProperty.Id)
        End Sub

        Private Sub NewAppointment_CanExecute(ByRef result As Boolean)
            result = (Me.CustomerProperty.Details.EntityState <> EntityState.Added)
        End Sub
    End Class

End Namespace