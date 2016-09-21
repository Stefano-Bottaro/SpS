
Namespace LightSwitchApplication

    Public Class Customer_Subscription

        Private Sub Data_start_Changed()
            Dim Start = CDate(Data_start)
            Me.Data_End = Start.AddYears(1)
        End Sub
    End Class

End Namespace
