
Namespace LightSwitchApplication

    Public Class Employee

        Private Sub Summary_Compute(ByRef result As String)
            If LastName <> "" And FirstName <> "" Then
                result = String.Format("{0} {1} ({2})", LastName, FirstName, UserName)
            End If
        End Sub

        Private Sub LastName_Changed()
            If Me.FirstName <> "" Then
                Me.UserName = Left(Me.FirstName, 1).ToLower & Me.LastName.ToLower
                Me.Email = Me.FirstName.ToLower & "." & Me.LastName.ToLower & "@"
            End If
           
        End Sub

        Private Sub FirstName_Changed()
            If Me.LastName <> "" Then
                Me.UserName = Left(Me.FirstName, 1).ToLower & Me.LastName.ToLower
                Me.Email = Me.FirstName.ToLower & "." & Me.LastName.ToLower & "@"
            End If
            
        End Sub
    End Class

End Namespace
