'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Imports Microsoft.LightSwitch.Details

Namespace LightSwitchApplication

    Public Class CreateNewAppointment
        'See the Appointment entity code for validation rules
        'See the ApplicationDataService code for server business rules

        Private Sub CreateNewAppointment_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("appointment.png")
            Me.Text_ScreenTitle = "New Appointment"
            Me.Text_EmailNotification = "* Please note that an email notification will be sent if the customer and employee have email addresses in the system."

            Me.AppointmentProperty = New Appointment()

            'If a customerID is passed in, then automatically set the Customer field
            If Me.CustomerID.HasValue Then
                Dim cust = Me.DataWorkspace.ApplicationData.Customers_SingleOrDefault(Me.CustomerID)
                If cust IsNot Nothing Then
                    Me.AppointmentProperty.Customer = cust
                End If
            Else
                'Automatically open the Customer selector for ease of use when the 
                ' appointment is created and no customer is specified.
                'You specify the name of the modal window picker control you want to open 
                ' (this name you set in the properties for the control) 
                Me.OpenModalWindow("CustomerPopup")
            End If
        End Sub

        Private Sub CreateNewAppointment_Saved()
            Me.Close(False)
            'Just close the screen, do not show the edit screen after the save.
            'Me.Application.ShowDefaultScreen(Me.AppointmentProperty)
        End Sub


        Private Sub ShowMap_Execute()
            Me.Application.ShowMapScreen(Me.AppointmentProperty.Location)
        End Sub

        Private Sub ShowMap_CanExecute(ByRef result As Boolean)
            result = (Me.AppointmentProperty.Location <> "")
        End Sub
    End Class

End Namespace