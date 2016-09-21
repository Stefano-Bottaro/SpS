'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class Appointment
        Private Sub StartTime_Validate(ByVal results As EntityValidationResultsBuilder)
            If Me.StartTime >= Me.EndTime Then
                results.AddPropertyError("Start time cannot be after end time.")
            End If
        End Sub

        Private Sub EndTime_Validate(ByVal results As Microsoft.LightSwitch.EntityValidationResultsBuilder)
            If Me.EndTime < Me.StartTime Then
                results.AddPropertyError("End time cannot be before start time.")
            End If
        End Sub

        Private Sub Appointment_Created()
            'Set the currently logged in Employee as the default for this appointment
            If Me.Employee Is Nothing Then
                Dim emp = Me.DataWorkspace.ApplicationData.GetEmployeeByUserName(Me.Application.User.Name)
                If emp IsNot Nothing Then
                    Me.Employee = emp
                End If
            End If
            'Set start and end time defaults
            Me.StartTime = Now
            Me.EndTime = Now.AddMinutes(30)
        End Sub

        Private Sub Customer_Validate(results As EntityValidationResultsBuilder)
            'Set the default location to the customer's address
            If Me.Customer IsNot Nothing AndAlso Me.Location Is Nothing Then
                Me.Location = Me.Customer.FullAddress
            End If

        End Sub
    End Class

End Namespace
