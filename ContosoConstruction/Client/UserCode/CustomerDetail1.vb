
Namespace LightSwitchApplication

    Public Class CustomerDetail1

        Private Sub Customer_Loaded(succeeded As Boolean)
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub Customer_Changed()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub CustomerDetail1_Saved()
            ' Write your code here.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub CustomerDetail1_Created()
            ' Write your code here.


        End Sub
    End Class

End Namespace