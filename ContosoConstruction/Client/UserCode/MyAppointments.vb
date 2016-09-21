'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class MyAppointments
        'See the Appointment entity code for validation rules
        'See the ApplicationDataService code for server business rules 

        Private Sub CurrentAppointmentsByEmployee_Loaded(succeeded As Boolean)
            If succeeded Then
                If Me.CurrentAppointmentsByEmployee Is Nothing OrElse Me.CurrentAppointmentsByEmployee.Count = 0 Then
                    If ShowMessageBox("You do not have any upcoming appointments. Would you like to add one now?", "My Appointments", MessageBoxOption.YesNo) = Windows.MessageBoxResult.Yes Then
                        Me.CurrentAppointmentsByEmployee.AddNew()
                    End If
                End If
            End If
        End Sub

        Private Sub MyAppointments_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("appointment.png")
            Me.Text_ScreenTitle = "My Appointments"
            Me.Text_EmailNotification = "* Please note that an email will be sent if you add, modify or cancel your already scheduled appointments."

            If Me.Application.LoggedInEmployee Is Nothing Then
                'If the logged in user cannot be found in the employee table then we can't display this screen.
                '(Note: The CurrentAppointmentsByEmployee query is supplying the Employee value in CurrentAppointmentsByEmployee_PreprocessQuery)
                ShowMessageBox("Cannot display your appointments. Your user name " + Me.Application.User.Name +
                   " was not found. Please have an administrator add you to the employee table.")
                Me.Close(False)
            End If
        End Sub

        Private Sub AppointmentListDeleteSelected_CanExecute(ByRef result As Boolean)
            result = (Me.CurrentAppointmentsByEmployee IsNot Nothing AndAlso Me.CurrentAppointmentsByEmployee.SelectedItem IsNot Nothing)
        End Sub

        Private Sub AppointmentListDeleteSelected_Execute()
            If Me.CurrentAppointmentsByEmployee.SelectedItem.Details.EntityState = EntityState.Added Then
                'Just delete right away if this was just added
                Me.CurrentAppointmentsByEmployee.SelectedItem.Delete()
            Else
                'Otherwise confirm with the user that this appointment should be canceled. (An email update will be sent)
                If ShowMessageBox("Are you sure you want to cancel this appointment? An email update will be sent.", "Cancel Appointment", MessageBoxOption.YesNo) = Windows.MessageBoxResult.Yes Then
                    Me.CurrentAppointmentsByEmployee.SelectedItem.Delete()
                End If
            End If
        End Sub

        Private Sub AppointmentListAddNew_Execute()
            'Add the new appointment and then open the customer modal window picker automatically
            Me.CurrentAppointmentsByEmployee.AddNew()
            Me.OpenModalWindow("CustomerPopup")
        End Sub

        Private Sub ShowMap_CanExecute(ByRef result As Boolean)
            result = (Me.CurrentAppointmentsByEmployee IsNot Nothing AndAlso
                      Me.CurrentAppointmentsByEmployee.SelectedItem IsNot Nothing AndAlso
                      Me.CurrentAppointmentsByEmployee.SelectedItem.Location <> "")
        End Sub

        Private Sub ShowMap_Execute()
            Me.Application.ShowMapScreen(Me.CurrentAppointmentsByEmployee.SelectedItem.Location)
        End Sub
    End Class

End Namespace
