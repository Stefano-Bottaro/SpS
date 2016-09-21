'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class ProjectDetail

        Private Sub Project_Loaded(succeeded As Boolean)
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Project)
        End Sub

        Private Sub Project_Changed()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Project)
        End Sub

        Private Sub ProjectDetail_Saved()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Project)

            If Me.Project.Details.EntityState = EntityState.Deleted OrElse
                Me.Project.Details.EntityState = EntityState.Discarded Then
                'Close the screen immediately if the project was cancelled (deleted)
                Me.Close(False)
            End If
        End Sub

        Private Sub ProjectMaterials_Changed(e As System.Collections.Specialized.NotifyCollectionChangedEventArgs)
            If e.Action = Collections.Specialized.NotifyCollectionChangedAction.Add Then
                'Automatically open the Materials selector for ease of use
                ' You specify the name of the modal window picker control you want to open 
                ' (this name you set in the properties for the control) 
                Me.OpenModalWindow("MaterialPopup")
            End If
        End Sub

        Private Sub ScheduleAppointment_Execute()
            'Show a new appointment screen but pass the customer ID so it is automatically filled out
            Me.Application.ShowCreateNewAppointment(Me.Project.Customer.Id)
        End Sub

        Private Sub ShowMap_Execute()
            'Show a map of the customer address
            Me.Application.ShowMapScreen(Me.Project.Customer.FullAddress)
        End Sub

        Private Sub ShowMap_CanExecute(ByRef result As Boolean)
            result = (Me.Project.Customer IsNot Nothing AndAlso Me.Project.Customer.FullAddress <> "")
        End Sub

        Private Sub ProjectDetail_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("newproject.png")

        End Sub

        Private Sub CancelProject_CanExecute(ByRef result As Boolean)
            'Only a system admin can cancel a project
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub CancelProject_Execute()
            If ShowMessageBox("Are you sure you want to cancel this project? WARNING: Any related pictures and project materials will be removed from the system.", "Cancel Project", MessageBoxOption.YesNo) = Windows.MessageBoxResult.Yes Then
                'We are not cascading the delete of pictures and project materials (this can be specified through the Entity Designer).
                ' Reason for this is that this is an admin function and we want the referential integrity to be intact otherwise.
                ' So manually delete all pictures and project materials from the screen. (User can still discard changes.)
                For Each p As Picture In Me.Project.Pictures
                    p.Delete()
                Next
                For Each pm As ProjectMaterial In Me.Project.ProjectMaterials
                    pm.Delete()
                Next
                Me.Project.Delete()

                Me.Save()
            End If
        End Sub

        Private Sub ProjectStatusReport_Execute()
            ' Use our report helper to export this project's data into Word. The Word report template is contained in the ClientGenerated project.
            MyReportHelper.RunProjectStatusReport(Me.Project)
        End Sub
    End Class

End Namespace