'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class Employee

        Private Sub Email_Validate(results As EntityValidationResultsBuilder)
            'An email address is used in the SMTPEmailHelper class 
            ' when sending appointments between customers & employees
            If Me.Email = "" Then
                results.AddPropertyResult("If you do not specify an email address then " +
                                          "no notifications will go out when scheduling appointments.",
                                          ValidationSeverity.Warning)
            End If

        End Sub

        Private Sub UserName_Validate(results As EntityValidationResultsBuilder)
            'This username is used to coorelate the employee with the logged in user.
            ' The username must match the username of the person logging into the system 
            ' for this to work so we are adding a warning here if we can't find a user record.
            If Me.UserName <> "" Then
                'If using forms authenticaion then this query will return a user record. 
                ' If using windows authenticaion it will only return a record if you are indicating
                ' specific user access to the system. i.e. if you allow "all authenticated users" then
                ' this will not return a record because those users do not need to all be stored.
                Dim user = Me.DataWorkspace.SecurityData.UserRegistrations_SingleOrDefault(Me.UserName)

                If user Is Nothing Then
                    results.AddPropertyResult("This user name was not found in the system. " +
                                              "Please make sure this user has acccess to the system " +
                                              "so they can see their appointments at system startup.",
                                              ValidationSeverity.Warning)
                End If
            End If
        End Sub

        Private Sub FullName_Compute(ByRef result As String)
            ' Set result to the desired field value
            result = Me.LastName + ", " + Me.FirstName
        End Sub
    End Class

End Namespace
