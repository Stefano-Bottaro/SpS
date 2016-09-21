
Namespace LightSwitchApplication

    Public Class Order

        Private Sub Document_Date_Changed()
            Me.Year = Document_Date.Year
            Me.Month = Document_Date.Month
            Me.Document_DataStart = Now
        End Sub

        Private Sub Total_Changed()
            If Me.Payment_Point Is Nothing Then
                Me.Payment_Point = 0
            End If
            If Me.Payment_Prepayd Is Nothing Then
                Me.Payment_Prepayd = 0
            End If
            If Me.Payment Is Nothing Then
                Me.Payment = 0
            End If
            Me.Payoff = Me.Total - Me.Payment_Point - Me.Payment_Prepayd - Me.Payment
        End Sub

        Private Sub Payment_Point_Changed()
           
            If Me.Payment_Prepayd Is Nothing Then
                Me.Payment_Prepayd = 0
            End If
            If Me.Payment Is Nothing Then
                Me.Payment = 0
            Else
                Me.Payment = Me.Total - Me.Payment_Point - Me.Payment_Prepayd
            End If
            Me.Payoff = Me.Total - Me.Payment_Point - Me.Payment_Prepayd - Me.Payment
        End Sub

        Private Sub Payment_Prepayd_Changed()
            If Me.Payment_Point Is Nothing Then
                Me.Payment_Point = 0
            End If
            If Me.Payment Is Nothing Then
                Me.Payment = 0
            Else
                Me.Payment = Me.Total - Me.Payment_Point - Me.Payment_Prepayd
            End If
            Me.Payoff = Me.Total - Me.Payment_Point - Me.Payment_Prepayd - Me.Payment
        End Sub

        Private Sub Payment_Changed()
            If Me.Payment_Point Is Nothing Then
                Me.Payment_Point = 0
            End If
            If Me.Payment_Prepayd Is Nothing Then
                Me.Payment_Prepayd = 0
            End If
            Me.Payoff = Me.Total - Me.Payment_Point - Me.Payment_Prepayd - Me.Payment
        End Sub

        Private Sub Customer_Changed()
            Me.Payment_Type = Customer.Payment_Type
            Me.Deferrals = Customer.Deferrals
            Me.Payment_Number = Customer.Payment_Number
            Me.AvailablePoints = Me.Customer.Point
            Me.Age = Customer.Age
            If Me.Customer.Order.Count = 1 Then  'se è la prima seduta 
                Me.New_Customer = True
            End If
           
        End Sub
    End Class

End Namespace
