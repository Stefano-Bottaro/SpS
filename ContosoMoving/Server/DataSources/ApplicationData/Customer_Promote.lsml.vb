
Namespace LightSwitchApplication

    Public Class Customer_Promote

        Private Sub Data_Start_Changed()
            Dim Start = CDate(Data_Start)
            Me.Data_End = Start.AddMonths(1)
        End Sub
    End Class

End Namespace
