'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class Project
        Private Sub StartDate_Validate(ByVal results As EntityValidationResultsBuilder)
            If Me.ActualEndDate <= Me.StartDate Then
                results.AddPropertyError("Project Start Date must be before End Date")
            End If
        End Sub

        Private Sub ActualEndDate_Validate(results As EntityValidationResultsBuilder)
            If Me.ActualEndDate <= Me.StartDate Then
                results.AddPropertyError("Project End Date must be after Start Date")
            End If
        End Sub

        Private Sub ProjectName_Validate(results As EntityValidationResultsBuilder)
            'Make sure that for any customer, the Project Name is unique.
            ' (Note: If you wanted the project name unique accross all projects in the system, 
            ' you would specify "Include in Unique Index" in the entity properties.) 
            If Me.Customer IsNot Nothing Then
                'Look at all the Projects that: 
                '   1) have a name specified 
                '   2) have the same name as this entity 
                '   3) is not this entity 
                Dim dupes = From p In Me.Customer.Projects
                              Where p.ProjectName <> "" AndAlso
                                    Me.ProjectName <> "" AndAlso
                                    p.ProjectName.ToLower = Me.ProjectName.ToLower AndAlso
                                    p IsNot Me

                'If any found, then we found a duplicate
                If dupes.Any Then
                    results.AddPropertyError(Me.ProjectName + " is already being used as a project name. Please specify a different name.")
                End If
            End If

        End Sub

        Private Sub TotalCost_Compute(ByRef result As Decimal)
            ' Calculate the project cost
            Dim materialsCost = Aggregate m In Me.ProjectMaterials
                                Into Sum(m.ItemTotal)

            result = materialsCost + Me.Labor
        End Sub

     
    End Class

End Namespace
