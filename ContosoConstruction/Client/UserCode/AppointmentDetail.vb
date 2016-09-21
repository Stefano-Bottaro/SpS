'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 
Namespace LightSwitchApplication

    Public Class AppointmentDetail
        'See the Appointment entity code for validation rules
        'See the ApplicationDataService code for server business rules

        Private Sub Appointment_Loaded(succeeded As Boolean)
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Appointment_Changed()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub AppointmentDetail_Saved()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Appointment)

            If Me.Appointment.Details.EntityState = EntityState.Deleted OrElse
                Me.Appointment.Details.EntityState = EntityState.Discarded Then
                'Close the screen immediately if the appointment was cancelled (deleted)
                Me.Close(False)
            End If
        End Sub

        Private Sub ShowMap_Execute()
            Me.Application.ShowMapScreen(Me.Appointment.Location)
        End Sub

        Private Sub ShowMap_CanExecute(ByRef result As Boolean)
            result = (Me.Appointment.Location <> "")
        End Sub

        Private Sub AppointmentDetail_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("appointment.png")
            Me.Text_EmailNotification = "* Please note that an email update will be sent if you modify or cancel this appointment."
        End Sub

        Private Sub CancelAppointment_Execute()
            If ShowMessageBox("Are you sure you want to cancel this appointment? An email update will be sent.", "Cancel Appointment", MessageBoxOption.YesNo) = Windows.MessageBoxResult.Yes Then
                Me.Appointment.Delete()
                Me.Save()
            End If
        End Sub

        Private Sub CancelAppointment_CanExecute(ByRef result As Boolean)
            'Employees can only cancel their own appointments unless they are a system admin
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration) OrElse
                     (Me.Application.LoggedInEmployee IsNot Nothing AndAlso
                      Me.Appointment.Employee.Id = Me.Application.LoggedInEmployee.Id)
        End Sub
    End Class

End Namespace