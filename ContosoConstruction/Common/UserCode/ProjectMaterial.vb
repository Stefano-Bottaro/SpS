'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class ProjectMaterial

        Private Sub ProjectMaterial_Created()
            Me.Quantity = 1




        End Sub

        Private Sub Material_Validate(results As EntityValidationResultsBuilder)
            'User can change this, but set the default price to the MSRP
            If Me.Material IsNot Nothing Then
                Me.Price = Me.Material.MSRP
            End If

            'Make sure that for any project, the selected materials are unique.
            'We are also limiting this in the selection query on the screen. 
            If Me.Material IsNot Nothing Then
                'Look at all the ProjectMaterials that: 
                '   1) have a material specified 
                '   2) have the same ID as this entity 
                '   3) is not this entity 
                Dim dupes = From m In Me.Project.ProjectMaterials
                              Where m.Material IsNot Nothing AndAlso
                                    m.Material.Id = Me.Material.Id AndAlso
                                    m IsNot Me

                'If any found, then we found a duplicate
                If dupes.Any Then
                    results.AddPropertyError(Me.Material.Name + " has already been selected. Adjust the quantity if necessary, you cannot have duplicate material line items.")
                End If
            End If

        End Sub

        Private Sub Summary_Compute(ByRef result As String)
            ' Return the summary of the material used on this project
            If Me.Material IsNot Nothing Then
                result = Me.Material.Summary
            End If
        End Sub

        Private Sub ItemTotal_Compute(ByRef result As Decimal)
            result = Me.Quantity * Me.Price
        End Sub
    End Class

End Namespace
