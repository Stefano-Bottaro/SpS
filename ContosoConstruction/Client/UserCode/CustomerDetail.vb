'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class CustomerDetail

        Private Sub Customer_Loaded(succeeded As Boolean)
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub Customer_Changed()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub CustomerDetail_Saved()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub NewProject_Execute()
            'Show a new project screen but pass the customer ID so it is automatically filled out
            Me.Application.ShowCreateNewProject(Me.Customer.Id)
        End Sub

        Private Sub NewAppointment_Execute()
            'Show a new appointment screen but pass the customer ID so it is automatically filled out
            Me.Application.ShowCreateNewAppointment(Me.Customer.Id)
        End Sub

        Private Sub ProjectsAddAndEditNew_Execute()
            'Show a new project screen but pass the customer ID so it is automatically filled out
            Me.Application.ShowCreateNewProject(Me.Customer.Id)
        End Sub

        Private Sub ShowMap_Execute()
            Me.Application.ShowMapScreen(Me.Customer.FullAddress)
        End Sub

        Private Sub ShowMap_CanExecute(ByRef result As Boolean)
            result = (Me.Customer.FullAddress <> "")
        End Sub

        Private Sub CustomerDetail_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("customer.png")
        End Sub

        Private Sub ProjectsEditSelected_CanExecute(ByRef result As Boolean)
            'Make sure a project is selected before editing it
            result = (Me.Projects IsNot Nothing AndAlso Me.Projects.SelectedItem IsNot Nothing)
        End Sub

        Private Sub ProjectsEditSelected_Execute()
            'Open the project details for the selected project
            Me.Application.ShowProjectDetail(Me.Projects.SelectedItem.Id)
        End Sub

        Private Sub ProjectsDeleteSelected_CanExecute(ByRef result As Boolean)
            'Make sure a project is selected before deleting it
            result = (Me.Projects IsNot Nothing AndAlso Me.Projects.SelectedItem IsNot Nothing)
        End Sub

        Private Sub ProjectsDeleteSelected_Execute()
            If ShowMessageBox("Are you sure you want to delete this project?", "Delete Project", MessageBoxOption.YesNo) = Windows.MessageBoxResult.Yes Then
                Me.Projects.SelectedItem.Delete()
            End If
        End Sub
    End Class

End Namespace