
Namespace LightSwitchApplication

    Public Class Employee_Incentive_Plan

        Private Sub Employee_Incentive_Plan_Created()
            Created = Today
            Me.Year = Created.Year
            Me.Month = Created.Month
        End Sub

        Private Sub Created_Changed()
            Me.Year = Created.Year
            Me.Month = Created.Month
        End Sub
    End Class

End Namespace
