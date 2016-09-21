'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class Customer

        Private Sub FullName_Compute(ByRef result As String)
            ' Set result to the desired field value
            result = Me.LastName + ", " + Me.FirstName
        End Sub

        Private Sub FullAddress_Compute(ByRef result As String)
            ' Set result to the desired field value
            result = Me.Address1 + " " + Me.Address2 + " " + Me.City + ", " + Me.State + " " + Me.ZIP
        End Sub

        Private Sub State_Validate(results As EntityValidationResultsBuilder)
            If Me.State <> "" Then
                'always format states in upper case
                Me.State = Me.State.ToUpper()
            End If
        End Sub

        Private Sub ZIP_Validate(results As EntityValidationResultsBuilder)
            If Me.ZIP <> "" Then
                'Enter the dash if not supplied and is 9 digits long
                If Me.ZIP.Length = 9 Then
                    Me.ZIP = Me.ZIP.Substring(0, 5) + "-" + Me.ZIP.Substring(5)
                End If
                'Make sure valid zip code (5 or 5+4 format)
                If Not System.Text.RegularExpressions.Regex.IsMatch(Me.ZIP, "^\d{5}$|^\d{5}-\d{4}$") Then
                    results.AddPropertyError("Please enter a valid US ZIP code. (ex. 98052 or 98052-1234)")
                End If
            End If

        End Sub

        Private Sub Address1_Validate(results As EntityValidationResultsBuilder)
            'Warn the user if the Address is empty
            If Me.Address1 = "" Then
                results.AddPropertyResult("Address should not be empty. Construction project cannot begin unless an address is supplied.", ValidationSeverity.Warning)
            End If

        End Sub

        Private Sub Email_Validate(results As EntityValidationResultsBuilder)
            'An email address is used in the SMTPEmailHelper class 
            ' when sending appointments between customers & employees
            If Me.Email = "" Then
                results.AddPropertyResult("If you do not specify an email address then no notifications will go out when scheduling appointments.", ValidationSeverity.Warning)
            End If

        End Sub
    End Class

End Namespace
