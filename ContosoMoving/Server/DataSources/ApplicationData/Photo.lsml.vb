
Namespace LightSwitchApplication

    Public Class Photo

        Private Sub Photo_Created()
            Me.Customer = Me.Order.Customer.LastName + " " + Me.Order.Customer.FirstName
            Me.Employee = Me.Order.Employee.Summary
            Me.created = Now
        End Sub
    End Class

End Namespace
